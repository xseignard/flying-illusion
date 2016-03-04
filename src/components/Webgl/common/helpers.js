import C from '../../../constants';
import THREE from 'three';

const TARGET_DISTANCE_FROM_TOP = 160;
const MOVE_DISTANCE_FROM_BOTTOM = -64;
const DISTANCE_FROM_MOVE_TO_TARGET = C.APP_HEIGHT
	- TARGET_DISTANCE_FROM_TOP
	- MOVE_DISTANCE_FROM_BOTTOM;

const arcadeWidth = C.APP_WIDTH / 4;
const originalXPosition = {
	left: -arcadeWidth,
	top: arcadeWidth / -3,
	bottom: arcadeWidth / 3,
	right: arcadeWidth
};

const originalYPosition = {
	target: C.APP_HEIGHT / 2 - TARGET_DISTANCE_FROM_TOP,
	move: C.APP_HEIGHT / -2 + MOVE_DISTANCE_FROM_BOTTOM,
};

export const getPosition = (type, direction, moveShowTime, gameTime) => {
	return new THREE.Vector3(
		originalXPosition[direction],
		originalYPosition[type],
		0
	);
};

export const getPositionY = (moveShowTime, gameTime) => {
	return originalYPosition.move
		+ (gameTime - moveShowTime) / C.MOVE_DURATION * DISTANCE_FROM_MOVE_TO_TARGET;
};

export const getMoveScale = (scaleIndex) => {
	return 0.75 - scaleIndex / (C.MOVE_HIT_FRAMES * 4);
};

export const getSpriteOffset = (tileIndex, hTiles, vTiles) => {
	return {
		x: tileIndex % hTiles / hTiles,
		y: vTiles - 1 - Math.floor(tileIndex / hTiles) / vTiles
	};
};
