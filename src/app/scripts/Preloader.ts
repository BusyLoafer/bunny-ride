import { Container, Loader } from "pixi.js";
import { Bunny } from "./classes/game/Bunny";
// import { Bunny } from "./classes/game/Bunny";
import { allBtns } from "./const/const";
import { houseBlocks } from "./const/houses";
import { placeNames, placeValues } from "./const/places";
import { allIcons, rays, SIZE, star } from "./const/uiConst";

const imgPath = {
	env: './assets/Environment/',
	ui: './assets/UI/',
	bunny: './assets/bunny/'
}

export class Preloader extends Container {
  // private onLoad!: Function;
  private loader: Loader;
  constructor(parent: Container, onLoad: Function) {
    super();

    // this.onLoad = onLoad;
    parent.addChild(this);
    this.position.set(SIZE.w * 0.5, SIZE.h * 0.5)

    this.loader = new Loader();

    this.loader.add(["assets/bunny/mi_bunny_ske.json", "assets/bunny/mi_bunny_tex.json", "assets/bunny/mi_bunny_tex.png"]);
    this.loader.onComplete.once(()=> {this.show(onLoad)});
    this.loader.load();
  }

  private show(func: Function): void {
    const bunny = new Bunny(this, this.loader);
    bunny.showPreloader();
    setTimeout(() => {
      this.download(func);
      this.destroy();
    }, 1000);
  }

  private download(func: Function): void {
    const loader = Loader.shared;

    // buttons
    allBtns.forEach(btnSetting => {
      loader.add(btnSetting.imageNames.base, imgPath.ui + btnSetting.fileNames.base);
      loader.add(btnSetting.imageNames.hover, imgPath.ui + btnSetting.fileNames.hover);
      loader.add(btnSetting.imageNames.active, imgPath.ui + btnSetting.fileNames.active);
    });

    // Leaderboard
    placeNames.forEach(place => loader.add(place.imageName, imgPath.ui + place.fileName));
    placeValues.forEach(place => loader.add(place.imageName, imgPath.ui + place.fileName));

    // popup
    loader.add('popup', imgPath.ui + 'info_plate_big.png');
    loader.add('popupHeader', imgPath.ui + 'header_info_plate.png');
    loader.add('input', imgPath.ui + 'user_name_bar.png');

    // congratulation
    loader.add(star.imageName, imgPath.ui + star.fileName);
    loader.add(rays.imageName, imgPath.ui + rays.fileName);

    // icons
    allIcons.forEach(icon => loader.add(icon.imageName, imgPath.ui + icon.fileName));

    loader.add("back_rocks", imgPath.env + "back_rocks.png");

    loader.add("floor", imgPath.env + "floor.png");

    loader.add("box", imgPath.env + "stopper_idle.png");
    loader.add("crushBox", imgPath.env + "stopper_crush.png");
    loader.add(houseBlocks);

    loader.add(["assets/bunny/mi_bunny_ske.json", "assets/bunny/mi_bunny_tex.json", "assets/bunny/mi_bunny_tex.png"]);
 
    loader.onComplete.once(() => {func()});

    loader.load();

  }
}