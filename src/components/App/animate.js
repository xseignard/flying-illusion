import { slaveRequestAnimationFrame } from '../../master';
import { world } from '../../world/master';

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
