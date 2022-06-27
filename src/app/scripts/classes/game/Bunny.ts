import dragonBones from "../../../../lib/dragonBones";
import { Container, Loader, Sprite } from "pixi.js";

const anims = {
  balloonBounce: "bunny_balloon_bounce",
  flyFallLoop: "bunny_fly_fall_loop",
  flyFallStart: "bunny_fly_fall_start",
  flyIdle: "bunny_fly_idle",
  flyStart: "bunny_fly_start",
  landSlide: "bunny_land_slide",
  lose: "bunny_lose",
  noActive: "bunny_no_active",
  slideLoop: "bunny_slide_loop",
  springboardJump: "bunny_springboard_jump"
}

enum State {
  ready, move, fly, fall, lose
}

export class Bunny {
  private bunny!: dragonBones.PixiArmatureDisplay;
  private state = State.move;
  private jumpSpeed = 0;
  private fallSpeed = 10;
  private keyDown = false;
  constructor(parent: Container) {

    dragonBones.PixiFactory.factory.clear();

    const factory = dragonBones.PixiFactory.factory;

    factory.parseDragonBonesData(Loader.shared.resources["assets/bunny/mi_bunny_ske.json"].data);
    factory.parseTextureAtlasData(
      Loader.shared.resources["assets/bunny/mi_bunny_tex.json"].data,
      Loader.shared.resources["assets/bunny/mi_bunny_tex.png"].texture
    );
    this.bunny = factory.buildArmatureDisplay("mi_bunny");
    this.bunny.animation.play(anims.landSlide);
    this.bunny.anchor.set(1, 1)
    this.bunny.scale.set(0.4)
    this.bunny.x = 200;
    this.bunny.y = 585;
    parent.addChild(this.bunny);

    this.bunny.interactive = true;
    
    window.addEventListener("pointerup", () => {this.keyDown = false});
    window.addEventListener("keyup", () => this.keyDown = false);
  }

  onClick(): void {
    if (!this.keyDown) {
      this.keyDown = true;
      this.jump();
    }
  }

  onKey(event: KeyboardEvent): void {
    if (!this.keyDown && event.code === "Space") {
      this.keyDown = true;
      this.jump();
    }
  }


  private jump(): void {
    if (this.state === State.move) {
      this.jumpSpeed = -30
      this.state = State.fly
      this.bunny.animation.play(anims.flyStart);
      this.bunny.animation.fadeIn(anims.flyIdle, 0.2);
    } else if (this.state === State.fly) {
      this.state = State.fall
      this.bunny.animation.play(anims.flyFallStart);
      this.bunny.animation.fadeIn(anims.flyFallLoop, 0.1);
    }
  }

  update(delta: number) {
    let velY = 4;
    switch (this.state) {
      case State.fall:
        velY += this.fallSpeed;
        this.move(velY * delta);
        break;
      case State.fly:
        velY += this.jumpSpeed;
        this.jumpSpeed = Math.min(this.jumpSpeed + 2 * delta, 0);
        this.move(velY * delta);
        break;

      default:
        break;
    }
  }

  checkCollision(box: Sprite): boolean {
    const { x, y, width } = this.bunny
    if (box.x < x + width && box.x + box.width > x && y > box.y - box.height) {
      this.bunny.animation.play(anims.lose, 1);
      this.bunny.y = 585;
      this.state = State.lose;
      return true
    }
    return false
  }

  reset(): void {
    this.state = State.move;
    this.bunny.animation.play(anims.slideLoop);
    this.jumpSpeed = 0;
    this.fallSpeed = 10;
  }

  private move(velY: number) {
    this.bunny.y = Math.min(this.bunny.y + velY, 585);
    if (this.bunny.y === 585) {
      this.state = State.move;
      this.bunny.animation.play(anims.slideLoop);
    }
  }

}