import { Container, Loader, Sprite, Text, TextStyle, } from "pixi.js";
import { createBtn } from "../../../ButtonManager";
import { btnLeader, btnLogin, btnPlay, User } from "../../../const/const";
import { translations } from "../../../const/lang";
import { basePopup } from "./BasePopup";

const scoreStyle = {
  fill: 0x00fd17,
  fontFamily: "Potta One",
  fontSize: 64,
  align: "center",
  dropShadow: true,
  dropShadowColor: '#003c76',
  dropShadowAngle: Math.PI / 2,
  dropShadowDistance: 8
}

const nickStyle = {
  fill: 0xFFFFFF,
  fontFamily: "Potta One",
  fontSize: 48,
  align: "left",
}

const langIndex = ["ru", "ru_RU"].includes(navigator.language) ? 0 : 1;

export class startPopup extends basePopup {

  constructor(
    parent: Container,
    playCLick: Function,
    user: User
  ) {
    super(parent, translations.startHeader[langIndex]);

    const score = new Text(translations.startText[langIndex] + user.bestScore.toString(), scoreStyle as TextStyle);
    score.position.set(0, 105);
    score.anchor.set(0.5, 0);
    this.addChild(score);

    const loginBtn = createBtn(btnLogin.imageNames, { x: 0, y: 300 }, () => { console.log("login") })
    loginBtn.anchor.set(0.5, 0);
    this.addChild(loginBtn);

    const input = new Sprite(Loader.shared.resources.input.texture)
    input.anchor.set(0.5, 0)
    input.position.set(0, 510)
    this.addChild(input)

    const nick = new Text('Guest_' + user.id.toString(), nickStyle as TextStyle);
    nick.position.set(-275, 535);
    this.addChild(nick);

    const nextBtn = createBtn(btnPlay.imageNames, { x: 0, y: 660 }, () => {playCLick("none")})
    this.addChild(nextBtn);

    const leaderBtn = createBtn(btnLeader.imageNames, { x: 0, y: 660 }, () => {playCLick("leader") })
    leaderBtn.anchor.set(1, 0);
    this.addChild(leaderBtn);
  }
}