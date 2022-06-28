import { Container, Loader, Sprite, Text, Texture } from "pixi.js";
import { createBtn } from "../../../managers/ButtonManager";
import { btnArrow, btnOk } from "../../../const/const";
import { translations } from "../../../const/lang";
import { placeNames, placeValues } from "../../../const/places";
import { basePopup } from "./BasePopup";

const winners: Winner[] = [
  {
    name: "NikolaevichPavel",
    value: 49444
  },
  {
    name: "Alex",
    value: 46822
  },
  {
    name: "Великий Александр",
    value: 27203
  },
  {
    name: "Алексей",
    value: 20545
  },
  {
    name: "Kevin Arbianto",
    value: 19907
  },
  {
    name: "4152017940",
    value: 16801
  },
  {
    name: "Willvase",
    value: 15981
  },
  {
    name: "Djoko Pramono",
    value: 15816
  },
  {
    name: "4169902532",
    value: 15533
  },
  {
    name: "Fahmi Aditya",
    value: 15179
  }
]

const titleStyle = {
  fill: 0xff6801,
  fontFamily: "Potta One",
  fontSize: 64,
  dropShadow: true,
  dropShadowColor: '#013e72',
  dropShadowAngle: Math.PI / 2,
  dropShadowDistance: 6
}

const numberTextWidth = 66;

const langIndex = ["ru", "ru_RU"].includes(navigator.language) ? 0 : 1;

const titles = translations.period[langIndex];

type Winner = {
  name: string,
  value: number
}

abstract class Position extends Container {
  constructor() {
    super();

  }
  abstract setText(data: Winner | null): void;
}

class PrizePlace extends Position {
  private nick!: Text;
  private points!: Text;
  constructor(
    place: Texture,
    value: Texture,
    data: Winner,
    color: number,
  ) {
    super()

    const textStyle = {
      fill: color,
      fontFamily: "Potta One",
      fontSize: 42
    }

    const placePlate = new Sprite(place);
    placePlate.anchor.set(0, 0.5);

    const valuePlate = new Sprite(value);
    valuePlate.anchor.set(0.5);
    
    const padding = 12;
    const valuePositionX = placePlate.width + padding + valuePlate.width * 0.5;
    valuePlate.x = valuePositionX;

    this.nick = new Text(data.name, textStyle);
    this.nick.anchor.set(0, 0.5)
    this.nick.x = 84;

    this.points = new Text(data.value.toString(), textStyle);
    this.points.anchor.set(0.5)
    this.points.x = valuePositionX;

    this.addChild(placePlate,
      valuePlate,
      this.nick,
      this.points
    )
  }

  public setText(data: Winner | null): void {
    this.nick.text = data ? data.name : "-";
    this.points.text = data ? data.value.toString() : "-"
  }
}

class MiddlePlace extends Position {
  private nick!: Text;
  private points!: Text;
  constructor(
    place: Texture,
    value: Texture,
    index: number,
    data: Winner,
  ) {
    super()

    const padding = 24;
    const textStyle=  {
      fill: 0x333333,
      fontFamily: "Potta One",
      fontSize: 36
    }

    const posIndex = new Text(index.toString(),
      {
        fill: 0xFFFFFF,
        fontFamily: "Potta One",
        fontSize: 36
      });
    posIndex.anchor.set(0.5)
    posIndex.x = numberTextWidth * 0.5;

    const placePlate = new Sprite(place);
    placePlate.anchor.set(0, 0.5);
    placePlate.x = numberTextWidth;

    const valuePlate = new Sprite(value);
    valuePlate.anchor.set(0.5);
    const valuePlatePosX = numberTextWidth + placePlate.width + padding + valuePlate.width * 0.5
    valuePlate.x = valuePlatePosX;

    this.nick = new Text(data.name, textStyle);
    this.nick.anchor.set(0, 0.5)
    this.nick.x = 84;

    this.points = new Text(data.value.toString(), textStyle);
    this.points.anchor.set(0.5)
    this.points.x = valuePlatePosX;

    this.addChild(placePlate,
      posIndex,
      valuePlate,
      this.nick,
      this.points
    )
  }

  public setText(data: Winner | null): void {
    this.nick.text = data ? data.name : "-";
    this.points.text = data ? data.value.toString() : "-"
  }
}

class Switcher extends Container {
  title!: Text;
  constructor(title: string, onClick: Function) {
    super();

    this.title = new Text(title, titleStyle);
    this.title.anchor.set(0.5)

    const prevBtn = createBtn(btnArrow.imageNames, { x: -252, y: 0 }, () => onClick(-1));
    prevBtn.scale.set(-1, 1);
    prevBtn.anchor.set(0, 0.5);

    const nextBtn = createBtn(btnArrow.imageNames, { x: 240, y: 0 }, () => onClick(-1));
    nextBtn.anchor.set(0, 0.5);

    this.addChild(this.title, prevBtn, nextBtn)

  }
}

export class leaderPopup extends basePopup {
  private switcher!: Switcher;
  private index: number = 0;
  private cells: Position[] = [];
  private interval!: NodeJS.Timeout;
  private counter: number = 0;
  constructor(
    parent: Container,
    okClick: Function,
  ) {
    super(parent, translations.leader[langIndex]);
    const loader = Loader.shared;

    this.switcher = new Switcher(titles[0], this.changePeriod.bind(this))
    this.switcher.y = 150;
    this.addChild(this.switcher);

    const placeImages: Texture[] = [];
    const valueImages: Texture[] = [];
    placeNames.forEach(item =>
      placeImages.push(loader.resources[item.imageName].texture as Texture)
    );
    placeValues.forEach(item =>
      valueImages.push(loader.resources[item.imageName].texture as Texture)
    );

    const colors = [0xc16001, 0x205caf, 0x8a1a00];
    const bigOffset = (placeImages[0].orig.width + 12 + valueImages[0].orig.width) * 0.5
    const smallOffset = (numberTextWidth + placeImages[3].orig.width + 16 + valueImages[1].orig.width) * 0.5

    winners.forEach((winner, i) => {
      let cell!: Position;
      if (i < 3) {
        cell = new PrizePlace(placeImages[i], valueImages[0], winner, colors[i]);
        cell.x = -bigOffset;
        cell.y = 225 + placeImages[i].orig.height * i;
      } else {
        cell = new MiddlePlace(placeImages[3], valueImages[1], i + 1, winner);
        cell.x = -smallOffset;
        cell.y = 225 + placeImages[0].orig.height * 3 + (placeImages[3].orig.height + 6) * (i - 3);
      }
      this.addChild(cell)
      this.cells.push(cell)
    })
    
    const okBtn = createBtn(btnOk.imageNames, { x: 0, y: 0 }, () => {this.reset(); okClick("start") })
    okBtn.y = 923 - 25 - okBtn.texture.orig.height * 0.5
    okBtn.anchor.set(0.5);
    this.addChild(okBtn);
  }

  public startAnim(): void {
    this.switcher.title.text = titles[this.index];
    this.cells.forEach((cell, i) => {
      cell.setText(this.index === 0 ? winners[i] : null)
      cell.visible = false
    })
    
    this.interval = setInterval(() => {
      if (this.counter < 10) {
        this.cells[this.counter].visible = true;
        this.counter++;
      }
    }, 80)
  }

  private reset(): void {
    this.index = 0;
    this.counter = 0;
    this.stopInterval();
  }

  private stopInterval(): void {
    if (this.interval) clearInterval(this.interval)
  }

  private changePeriod(delta: number) {
    this.stopInterval();
    this.index += delta;
    this.counter = 0;
    if (this.index > 2) {
      this.index = 0
    } else if (this.index < 0) {
      this.index = 2
    }
    this.startAnim()
  }
}