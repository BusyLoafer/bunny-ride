import { Button, Textures } from './Button';

export class ChangingButton extends Button {
  private originTextures!: Textures;
  private subTextures!: Textures;
  private useOrigin: boolean = true;
  constructor(textures: Textures, subTextures: Textures, x: number, y: number, onClick: Function) {
    super(textures, x, y, onClick);
    this.originTextures = textures;
    this.subTextures = subTextures;
  }

  onButtonUp(): void {
    this.changeTextures();
    super.onButtonUp();
  }

  private changeTextures() {
    const {originTextures, subTextures} = this
    if (this.useOrigin) {
      this.textures = subTextures;
    } else {
      this.textures = originTextures;
    }
    this.useOrigin = !this.useOrigin;
  }
};