import { slaveRequestAnimationFrame } from '../../utils/master';
import { world } from '../../world/master';
import { getSpriteOffset } from '../Webgl/common/helpers';

export const animate = (targetsRefs, movesRefs) => {
	Object.keys(targetsRefs).forEach(direction => {
		if (!world.targets[direction].shouldAnimate) {
			targetsRefs[direction].material.opacity = 0;
		}
		else {
			targetsRefs[direction].material.opacity = 1;
			targetsRefs[direction].texture.offset = world.targets[direction].textureOffset;
		}
	});
	Object.keys(world.moves).forEach(id => {
		if (world.moves[id] && world.moves[id].visible && movesRefs[id]) {
			movesRefs[id].mesh.translateY(
				world.moves[id].positionY - movesRefs[id].mesh.position.y
			);
		}
	});
	slaveRequestAnimationFrame();
};

export const reset = (targetsRefs, movesRefs) => {
	Object.keys(targetsRefs).forEach(direction => {
		targetsRefs[direction].material.opacity = 0;
		targetsRefs[direction].texture.offset = getSpriteOffset(0, 8, 9);
	});
	Object.keys(world.moves).forEach(id => {
		if (movesRefs[id]) movesRefs[id].mesh.position.y = -600;
	});
};
