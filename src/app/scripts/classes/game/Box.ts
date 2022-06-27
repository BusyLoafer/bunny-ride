import { Container, Loader, Sprite } from "pixi.js";

export class Box extends Sprite {
  private crash = Loader.shared.resources.crushBox.texture;
  constructor(parent: Container, x: number) {
    super(Loader.shared.resources.box.texture);
    this.x = x;
    this.y = 585;
    this.anchor.set(0, 1);
    this.scale.set(0.5)
    parent.addChild(this);
  }

  collision(): void {
    this.texture = this.crash
  }
}