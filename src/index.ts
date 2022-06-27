import { Congratulation } from './app/scripts/classes/UI/Congratulation';
import { FinishPopup } from './app/scripts/classes/UI/Popups/FinishPopup';
import { leaderPopup } from './app/scripts/classes/UI/Popups/LeaderPopup';
import { startPopup } from './app/scripts/classes/UI/Popups/StartPopup';
import { GUI } from './app/scripts/classes/UI/UI';
import { allBtns, User } from './app/scripts/const/const';
import { placeNames, placeValues } from './app/scripts/const/places';
import { allIcons, popupNames, rays, SIZE, star } from './app/scripts/const/uiConst';
import { Application, Container, Graphics, Loader, TilingSprite } from 'pixi.js';
import { Bunny } from './app/scripts/classes/game/Bunny';
import { Box } from './app/scripts/classes/game/Box';

const imgPath = {
	env: './assets/Environment/',
	ui: './assets/UI/',
	bunny: './assets/bunny/'
}

enum UIState {
	none,
	start,
	leaders,
	score
}

enum GameState {
	start, play, pause, lose
}

const app = new Application({
	width: SIZE.w,
	height: SIZE.h,
	backgroundColor: 0x89c0fc,
	resolution: 1,
	sharedTicker: true,
	sharedLoader: true,
});

const user: User = {
	sound: true,
	currentScore: 115,
	bestScore: 0,
	coins: 5,
	id: 1000 + Math.floor(Math.random() * 1000),
}

let uiState: UIState = UIState.start;
let gameState = GameState.play;

// UI containers
let startWindow: startPopup;
let leaderBoard: leaderPopup;
let finishWindow: FinishPopup;
let congWindow: Congratulation;
let UIContainer: GUI;
let pauseBg = new Graphics();

let backRock!: PIXI.TilingSprite;
let floor!: PIXI.TilingSprite;
let gameContainer = new Container();
let boxContainer = new Container();
let playerContainer = new Container();
gameContainer.addChild(boxContainer, playerContainer)

let currentDis = 0;
let nextBox = 1000;
let speed = 25;

const boxes: Box[] = [];

let bunny: Bunny;

document.getElementById('app').appendChild(app.view);

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

loader.add(["assets/bunny/mi_bunny_ske.json", "assets/bunny/mi_bunny_tex.json", "assets/bunny/mi_bunny_tex.png"]);

loader.load();

const initScene = () => {

	backRock = new TilingSprite(loader.resources["back_rocks"].texture, SIZE.w * 2, SIZE.h);
	backRock.scale.set(0.5);
	backRock.anchor.y = 1;
	backRock.position.set(0, SIZE.h);
	app.stage.addChild(backRock);

	floor = new TilingSprite(loader.resources["floor"].texture, SIZE.w * 2.2, 300);
	floor.scale.set(0.5)
	floor.position.y = 580;

	gameContainer.addChild(floor);
	gameContainer.pivot.set(SIZE.w * 0.5, SIZE.h * 0.5);
	gameContainer.position.set(SIZE.w * 0.5, SIZE.h * 0.5);
	gameContainer.angle = 4;
	app.stage.addChild(gameContainer);

	startWindow = new startPopup(app.stage, changePopup, user);
	leaderBoard = new leaderPopup(app.stage, changePopup);
	congWindow = new Congratulation(app.stage);
	finishWindow = new FinishPopup(app.stage, changePopup);
	UIContainer = new GUI(app.stage, user, switchOnFullscreen, changeSound, toggleGamePause);

	pauseBg.beginFill(0x000000, 0.2);
	pauseBg.drawRect(-100, -100, SIZE.w + 200, SIZE.h + 200);
	pauseBg.endFill();
	pauseBg.interactive = true;
	pauseBg.on("pointerdown", () => { if (gameState === GameState.play) bunny.onClick() });
	pauseBg.alpha = 0;
	window.addEventListener("keydown", (event: KeyboardEvent) => { if (gameState === GameState.play) bunny.onKey(event) });

	gameContainer.addChild(pauseBg);

	bunny = new Bunny(playerContainer);
	window.addEventListener("resize", resize);

	app.ticker.add(gameLoop);
}

loader.onComplete.add(initScene);

const gameLoop = (delta: number): void => {
	if (uiState === UIState.score) {
		congWindow.update(delta)
	}
	switch (gameState) {
		case GameState.play:
			bunny.update(delta);
			updateBG(delta);
			updateBoxes(delta);
			break;
	}

}

const updateBG = (delta: number) => {
	const distance = speed * delta;
	backRock.tilePosition.x -= 1 * delta;
	floor.tilePosition.x -= distance;
}

const updateBoxes = (delta: number) => {
	const distance = speed * delta;
	currentDis += distance;

	if (currentDis > nextBox) {
		nextBox += 5000;
		boxes.forEach(box => box.destroy());
		boxes.length = 0;
		boxes.push(new Box(boxContainer, 2000))
	}

	boxes.forEach(box => {
		box.x -= distance * 0.5;
		if (bunny.checkCollision(box)) {
			box.collision();
			speed = 0;
			gameState = GameState.lose
			uiState = UIState.score
			finishWindow.show();
			congWindow.show();
		}
	});
}

const toggleGamePause = () => {
	if (gameState === GameState.pause) {
		gameState = GameState.play;
		pauseBg.alpha = 0;
	} else if (gameState === GameState.play) {
		gameState = GameState.pause;
		pauseBg.alpha = 1;
	}
}

const changeSound = () => {
	user.sound = !user.sound
	localStorage.setItem("sound", JSON.stringify(user.sound));
}

const resize = () => {
	UIContainer.resize()
}

const changePopup = (name: string) => {
	switch (name) {
		case popupNames.leader:
			startWindow.visible = false;
			leaderBoard.visible = true;
			finishWindow.visible = false;
			congWindow.visible = false;
			uiState = UIState.leaders;
			leaderBoard.startAnim()
			break;

		case popupNames.start:
			startWindow.visible = true;
			leaderBoard.visible = false;
			uiState = UIState.start;
			break;

		case popupNames.none:
			reset();
			break;
	}
}

const switchOnFullscreen = () => {
	document.documentElement.requestFullscreen();
}

const reset = () => {
	currentDis = 0;
	nextBox = 1000;
	speed = 25;

	boxes.forEach(box => box.destroy());
	boxes.length = 0;

	uiState = UIState.none;
	startWindow.visible = false;
	gameState = GameState.play;

	bunny.reset();
}
