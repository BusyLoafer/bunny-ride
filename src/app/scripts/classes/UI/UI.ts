import { Container, Loader, Sprite, Text } from "pixi.js";
import { createBtn, createChangingBtn } from "../../ButtonManager";
import { btnFullscreen, btnPause, btnSoundOff, btnSoundOn, User } from "../../const/const";
import { SIZE } from "../../const/uiConst";

const btnSize = {
  size: 120,
  padding: 30
}

const coinsStyle = {
  fill: 0xFFFFFF,
  fontFamily: "Potta One",
  fontSize: 56,
}

export class GUI extends Container {
  private menu = new Container();
  private counter = new Container();
  private coins = new Text("", coinsStyle);
  constructor(
    parent: Container,
    user: User,
    onFullScreen: Function,
    onSound: Function,
    onPause: Function
  ) {
    super();
    parent.addChild(this);
    this.addChild(this.menu, this.counter);
    this.position.x = SIZE.w * 0.5;
    this.position.y = 10;
    this.menu.scale.set(2 / 3);
    this.counter.scale.set(2 / 3);

    const loader = Loader.shared;

    const coinPlate = new Sprite(loader.resources.coinPlate.texture);
    coinPlate.anchor.y = 0.5;
    coinPlate.position.set(80, 45);

    const coinIcon = new Sprite(loader.resources.coin.texture);
    coinIcon.x = 15;
    
    this.coins.anchor.y = 0.5;
    this.coins.position.set(170, 45);
    this.coins.text = user.coins.toString()
    this.counter.addChild(coinPlate, coinIcon, this.coins);

    const btnFull = createBtn(btnFullscreen.imageNames, { x: (btnSize.size + btnSize.padding) * -3, y: 0 }, onFullScreen);
    const btnSound = createChangingBtn(
      btnSoundOn.imageNames,
      btnSoundOff.imageNames,
      { x: (btnSize.size + btnSize.padding) * -2, y: 0 },
      onSound
    );
    const btnPauseGame = createBtn(btnPause.imageNames, { x: (btnSize.size + btnSize.padding) * -1, y: 0 }, onPause);
    this.menu.addChild(btnFull, btnSound, btnPauseGame);

    this.resize();
  }

  public resize(): void {
    const minSize = Math.min(window.innerWidth, SIZE.w) * 0.5
    this.menu.x = minSize;
    this.counter.x = -minSize;
  }
}