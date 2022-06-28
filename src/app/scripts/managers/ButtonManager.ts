import { Loader } from "pixi.js";
import { BtnTextureName, Button, Textures } from "../classes/UI/Buttons/Button";
import { ChangingButton } from "../classes/UI/Buttons/ChangingButton";

type Point = {
  x: number, y: number
}

export const createBtn = (names: BtnTextureName, point: Point, func: Function): Button => {
	const btnTextures: Textures = getTextures(names);
	return new Button(btnTextures, point.x, point.y, func)
} 

export const createChangingBtn = (names: BtnTextureName, subNames: BtnTextureName, point: Point, func: Function): ChangingButton => {
	const btnTextures: Textures = getTextures(names);
	const btnSubTextures: Textures = getTextures(subNames);
	return new ChangingButton(btnTextures, btnSubTextures, point.x, point.y, func)
}

const getTextures = (names: BtnTextureName): Textures => {
	return {
		base: Loader.shared.resources[names.base].texture,
		hover: Loader.shared.resources[names.hover].texture,
		active: Loader.shared.resources[names.active].texture,
	}
}