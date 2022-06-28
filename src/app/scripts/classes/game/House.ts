import { Container, Loader, Sprite } from "pixi.js";
import { houseBlocks } from "../../const/houses";

export class House extends Container {
  constructor(parent: Container, houseData: number[][], x: number) {
    super();
    this.position.x = x;
    this.createHouseImage(houseData);
    parent.addChild(this);
  }

  private createHouseImage(houseData: number[][]): void {
    houseData.forEach((line: number[], i) => {
      line.forEach((imageId: number, j) => {
        if (imageId !== -1) {
          const block = new Sprite(Loader.shared.resources[houseBlocks[imageId]].texture);
          block.anchor.set(0, 1);
          block.x = j * 228;
          block.y = -i * 228;
          this.addChild(block);
        }
      })
    })
  }
}