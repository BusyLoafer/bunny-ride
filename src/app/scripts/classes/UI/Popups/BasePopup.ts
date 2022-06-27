import { Container, Loader, Sprite, Text } from "pixi.js";
import { CENTER } from "../../../const/uiConst";

const textStyle = { fill: 0x003d71, fontFamily: "Potta One", fontSize: 60 };

export class basePopup extends Container {
  private intervalFunc!: NodeJS.Timeout;
  private text!: Text;
  private posY = 0;
  constructor(parent: Container, headerText: string) {
    super();
    parent.addChild(this);
    this.scale.set(2 / 3)
    this.visible = false;

    // background
    const background = new Sprite(Loader.shared.resources.popup.texture)
    background.anchor.set(0.5, 0);

    this.posY = CENTER.y - background.height * 1 / 3;
    this.position.set(CENTER.x, CENTER.y - background.height * 1 / 3)

    // header
    const header = new Sprite(Loader.shared.resources.popupHeader.texture);
    header.anchor.set(0.5, 0);
    header.position.set(0, 10);

    // header text
    this.text = new Text(headerText, textStyle)
    this.text.position.set(0, 10)
    this.text.anchor.set(0.5, 0)
    this.addChild(background, header, this.text)
  }

  public setText(value: string) {
    this.text.text = value;
  }

  public show = () => {
    this.y -= 200;
    this.visible = true;
    
    this.intervalFunc = setInterval(() => {
      if (this.y < this.posY) {
        this.y += 20;
      } else {
        this.y = this.posY;
        clearInterval(this.intervalFunc);
      }
    }, 40)
  }
}