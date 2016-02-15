import C from '../../../constants';
import THREE from 'three';

const TARGET_DISTANCE_FROM_TOP = 60;
const MOVE_DISTANCE_FROM_BOTTOM = 60;
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
	target: C.APP_HEIGHT / 2 - MOVE_DISTANCE_FROM_BOTTOM,
	move: C.APP_HEIGHT / -2 + TARGET_DISTANCE_FROM_TOP,
};

const getYPosition = (type, moveShowTime, gameTime) => {
	if (type === 'target') {
		return originalYPosition.target;
	}
	const moveTime = gameTime - moveShowTime;
	const moveProgression = moveTime / C.MOVE_DURATION;
	const distance = moveProgression * DISTANCE_FROM_MOVE_TO_TARGET;
	return originalYPosition.move + distance;
};

export const getPosition = (type, direction, moveShowTime, gameTime) => {
	return new THREE.Vector3(
		originalXPosition[direction],
		getYPosition(type, moveShowTime, gameTime),
		0
	);
};

export const getGeometry = (move) => {
	return `${move.direction}ArrowGeometry`;
};
