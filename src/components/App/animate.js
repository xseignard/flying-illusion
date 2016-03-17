import { world } from '../../threads/master/world';
import { getSpriteOffset } from '../Webgl/common/helpers';

export const animate = (threeRefs, targetsRefs, movesRefs) => {
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
			// always translate the move
			movesRefs[id].mesh.translateY(
				world.moves[id].positionY - movesRefs[id].mesh.position.y
			);
			// if target is hit, change geometry, material and scale it
			if (world.moves[id].shouldScale) {
				movesRefs[id].mesh.material = threeRefs.hitMovesMaterials[world.moves[id].direction];
				movesRefs[id].mesh.geometry = threeRefs.hitMovesGeometries[world.moves[id].direction];
				movesRefs[id].mesh.scale.set(
					world.moves[id].scale,
					world.moves[id].scale,
					1
				);
				movesRefs[id].mesh.material.opacity = world.moves[id].scale;
			}
			// move is fail and/or missed
			else if (world.moves[id].shouldFade) {
				movesRefs[id].mesh.material.opacity = world.moves[id].scale;
			}
			// no hit, no fail/miss, geometry, material are the regular ones
			else if (
				typeof world.moves[id].shouldScale === 'undefined' &&
				typeof world.moves[id].shouldFade === 'undefined'
			) {
				movesRefs[id].mesh.material = movesRefs[id].material;
				movesRefs[id].mesh.geometry = movesRefs[id].geometry;
				movesRefs[id].mesh.material.opacity = 1;
			}
		}
	});
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
