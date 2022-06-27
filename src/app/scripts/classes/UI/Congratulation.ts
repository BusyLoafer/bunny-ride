import { Container, Loader, Sprite, Texture } from "pixi.js";
import { CENTER } from "../../const/uiConst";

const positions = [
  {x: -520, y: -340},
  {x: -550, y: -120},
  {x: -610, y: 120},
  {x: -500, y: 300}
]

const baseSpeed: number = 0.002;
const reverseSpeed: number = -0.004;
const raysRotateSpeed: number = 0.005;
const raysScaleSpeed: number = 0.002;

class Star extends Sprite {
  dirRotate!: number;
  constructor(
    parent: Container, 
    texture: Texture,
    x: number, y: number, dirRotate: number
    ) {
    super(texture)
    parent.addChild(this);
    this.anchor.set(0.5);
    this.position.set(x, y);
    this.scale.set(Math.random() + 0.5);
    this.dirRotate = dirRotate;
  }
}

export class Congratulation extends Container {
  private rays!: Sprite;
  private raysScale: number = 1;
  private raysScaleDir: number = -1;
  private stars: Star[] = [];
  private starAngle: number = 0;
  private starSpeed: number = baseSpeed;
  private intervalFunc!: NodeJS.Timeout;
  private posY = CENTER.y;
  constructor(parent: Container) {
    super();
    parent.addChild(this);
    this.position.set(CENTER.x, CENTER.y);
    this.scale.set(2 / 3);
    this.visible = false;

    const loader = Loader.shared;

    this.rays = new Sprite(loader.resources.rays.texture);
    this.rays.anchor.set(0.5);
    this.addChild(this.rays);

    positions.forEach(({x, y}) => {
      const dirRotate = Math.floor(Math.random() * 2) === 1 ? 1 : -1;
      const starLeft = new Star(this, loader.resources.star.texture as Texture, x, y, dirRotate);
      const starRight = new Star(this, loader.resources.star.texture as Texture, -x, y, -dirRotate);
      this.stars.push(starLeft);
      this.stars.push(starRight);
      this.addChild(starLeft, starRight);
    })
  }

  update(delta: number): void {
    this.starRotate(delta);
    this.raysRotateAndScale(delta);
  }
  show(): void {
    this.y -= 200;
    this.visible = true;
    
    this.intervalFunc = setInterval(() => {
      if (this.y < this.posY) {
        this.y += 20
      } else {
        this.y = this.posY;
        clearInterval(this.intervalFunc)
      }
    }, 40)
  }

  private starRotate(delta: number): void {
    this.starAngle += delta * this.starSpeed;
    if (this.starAngle > 0.2) {
      this.starSpeed = reverseSpeed;
    } else if (this.starAngle < -0.2) {
      this.starSpeed = baseSpeed;
    }
    this.stars.forEach(star => {
      star.rotation = star.dirRotate * this.starAngle;
    })
  }

  private raysRotateAndScale(delta: number): void {
    this.rays.rotation += delta * raysRotateSpeed;
    this.raysScale += this.raysScaleDir * delta * raysScaleSpeed
    this.rays.scale.set(this.raysScale);
    if (this.raysScale > 1 || this.raysScale < 0.8) {
      this.raysScaleDir = -this.raysScaleDir;
    }
  }
}