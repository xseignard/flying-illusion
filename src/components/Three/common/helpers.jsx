import C from '../../../constants';
import THREE from 'three';

const framesPerMillisecond = 60 / 1000;
const framesPerAnimation = C.MOVE_DURATION * framesPerMillisecond;
export const distancePerFrame = (C.APP_HEIGHT - 60) / framesPerAnimation;

export const getPosition = (move, isMove) => {
	const arcadeWidth = C.APP_WIDTH * 3 / 4;
	const coords = {
		x: {
			left: arcadeWidth / -4,
			top: arcadeWidth / -12,
			bottom: arcadeWidth / 12,
			right: arcadeWidth / 4
		},
		y: isMove ? C.APP_HEIGHT / -2 : C.APP_HEIGHT / 2 - 60
	};
	return {
		x: coords.x[move.direction],
		y: coords.y,
		position: new THREE.Vector3(coords.x[move.direction], coords.y, 0)
	};
};

export const getGeometry = (move) => {
	return `${move.direction}ArrowGeometry`;
};
