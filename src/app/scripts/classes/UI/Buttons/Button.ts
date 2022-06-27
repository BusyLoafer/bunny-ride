import {
  Sprite, Texture
} from 'pixi.js';

export type Textures = {
  base: Texture,
  hover: Texture,
  active: Texture
}
export type BtnTextureName = {
  base: string,
  hover: string,
  active: string
}

export class Button extends Sprite {
  protected textures!: Textures;
  private onClick!: Function;
  constructor(textures: Textures, x: number, y: number, onClick: Function) {
    super(textures.base)
    this.textures = textures;
    this.x = x;
    this.y = y;
    this.interactive = true;
    this.buttonMode = true;
    this.onClick = onClick;

    this.initEvents()
  }

  private initEvents(): void {
    this.on('pointerdown', this.onButtonDown)
    .on('pointerup', (event: PointerEvent) => {event.stopPropagation(); this.onButtonUp()})
    .on('pointerover', this.onButtonOver)
    .on('pointerout', this.onButtonOut);
  }

  protected onButtonUp(): void {
    this.onButtonOver();
    this.onClick();
  }

  private onButtonDown(): void {
    this.texture = this.textures.active
  }

  private onButtonOver(): void {
    this.texture = this.textures.hover
  }

  private onButtonOut(): void {
    this.texture = this.textures.base
  }
};