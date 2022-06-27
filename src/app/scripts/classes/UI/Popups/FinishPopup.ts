import { Container, Loader, Sprite, Text } from "pixi.js";
import { createBtn } from "../../../ButtonManager";
import { btnOk } from "../../../const/const";
import { translations } from "../../../const/lang";
import { basePopup } from "./BasePopup";

const scoreStyle = {
  fill: 0x00cc00,
  fontFamily: "Potta One",
  fontSize: 180,
  dropShadow: true,
  dropShadowColor: '#013e72',
  dropShadowAngle: Math.PI / 2,
  dropShadowDistance: 6
}

const coinsStyle = {
  fill: 0xf4ad25,
  fontFamily: "Potta One",
  fontSize: 120,
  dropShadow: true,
  dropShadowColor: '#003b6d',
  dropShadowAngle: Math.PI / 2,
  dropShadowDistance: 6
}

const distanceStyle = {
  fill: 0x9ac6ff,
  fontFamily: "Potta One",
  fontSize: 100,
  dropShadow: true,
  dropShadowColor: '#003b6d',
  dropShadowAngle: Math.PI / 2,
  dropShadowDistance: 6
}

const langIndex = ["ru", "ru_RU"].includes(navigator.language) ? 0 : 1;

export class FinishPopup extends basePopup {
  private score!: Text;
  private coins!: Text;
  private distance!: Text;
  constructor(
    parent: Container,
    okClick: Function,
    score: number = 115,
    coins: number = 5,
    distance: number = 90
  ) {
    super(parent, translations.finishHeader[langIndex]);
    const loader = Loader.shared;
    
    const okBtn = createBtn(btnOk.imageNames, { x: 0, y: 0 }, () => { okClick('leader') })
    okBtn.y = 923 - 25 - okBtn.texture.orig.height * 0.5
    okBtn.anchor.set(0.5);
    this.addChild(okBtn);
    
    this.score = new Text(score.toString(), scoreStyle);
    this.score.position.set(0, 105);
    this.score.anchor.set(0.5, 0);
    this.addChild(this.score);

    // coins
    const coinsContainer = new Container();
    coinsContainer.x = (-753) * 0.5
    coinsContainer.y = 435
    
    const coinIcon = new Sprite(loader.resources.coin.texture)
    coinIcon.anchor.set(0, 1)
    coinIcon.position.x = 100
    coinsContainer.addChild(coinIcon);

    this.coins = new Text(coins.toString(), coinsStyle);
    this.coins.position.set(420, 40);
    this.coins.anchor.set(0.5, 1);
    coinsContainer.addChild(this.coins);
    
    this.addChild(coinsContainer);
    
    // distance
    const distanceContainer = new Container();
    distanceContainer.x = (-753) * 0.5
    distanceContainer.y = 630

    const flagIcon = new Sprite(loader.resources.flagIcon.texture)
    flagIcon.anchor.set(0, 1)
    flagIcon.position.x = 80
    distanceContainer.addChild(flagIcon);

    this.distance = new Text(distance.toString() + ' m', distanceStyle);
    this.distance.position.set(445, 10);
    this.distance.anchor.set(0.5, 1);
    distanceContainer.addChild(this.distance);


    this.addChild(distanceContainer);
  }

  public setScore(data: {score: number, coins: number, distance: number}): void {
    this.score.text = data.score.toString();
    this.coins.text = data.coins.toString();
    this.distance.text = data.distance.toString() + ' m';
  }
}