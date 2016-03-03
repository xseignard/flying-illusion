import { is, fromJS } from 'immutable';
import { store } from '../stores/slave';
import {
	getPositionY,
	getSpriteOffset,
	getMoveScale
} from '../components/Webgl/common/helpers';
import { getPerformance } from '../selectors/performance';
import { getHits } from '../selectors/hits';
import C from '../constants';
import { dispatchToMaster } from '../utils/slave';

const hTiles = 8;
const vTiles = 9;
const commentSuccess = /ok|good|excellent/;

/*
	world: sent to Master via postMessage
	S: mutable state to optimize performance
*/

const getDefaultWorld = () => {
	return {
		moves: {},
		targets: {
			left: {
				shouldAnimate: false,
				textureOffset: getSpriteOffset(0, 8, 9)
			},
			top: {
				shouldAnimate: false,
				textureOffset: getSpriteOffset(0, 8, 9)
			},
			bottom: {
				shouldAnimate: false,
				textureOffset: getSpriteOffset(0, 8, 9)
			},
			right: {
				shouldAnimate: false,
				textureOffset: getSpriteOffset(0, 8, 9)
			},
		}
	};
};

export let world = getDefaultWorld();

export const S = {
	choregraphyTime: null, // Integer
	perf: null, // object
	hits: null, // object
	moves: null, // immutable List
	hasTimeBeforeRAF: false,
	shouldCheckOnRAF: false,
	shouldDispatchStatsOnRAF: false,
	targetsTileIndexes: { left: 0, top: 0, bottom: 0, right: 0 },
	movesScaleIndexes: {},
	showTimes: {},
};

export const initWorld = () => {
	return (dispatch, getState) => {
		const state = getState();
		S.perf = getPerformance(state);
		S.moves = state.dance.get('moves');
		world = getDefaultWorld();
		S.showTimes = {};
		S.movesScaleIndexes = {};
		S.moves.forEach(move => {
			world.moves[move.id] = {};
			S.showTimes[move.id] = move.showTime;
			S.movesScaleIndexes[move.id] = 0;
		});
	};
};

export const resetWorld = () => {
	return (dispatch, getState) => {
		world = getDefaultWorld();
	};
};

const checkTarget = (perf, direction) => {
	if (
		(
			S.perf.snapshots[direction].lastComment !== perf.snapshots[direction].lastComment ||
			S.perf.snapshots[direction].commentCount !== perf.snapshots[direction].commentCount
		) &&
		perf.snapshots[direction].lastComment.match(commentSuccess)
	) {
		S.targetsTileIndexes[direction] = 0;
		world.targets[direction].shouldAnimate = true;
		world.targets[direction].textureOffset = getSpriteOffset(0, hTiles, vTiles);
	}
};

const checkMove = (move, index) => {
	const previousMove = S.moves.get(index);
	if (move.visible !== previousMove.visible) {
		world.moves[move.id].visible = move.visible;
		if (!world.moves[move.id].visible) world.moves[move.id].positionY = undefined;
	}
	if (move.commentable !== previousMove.commentable) {
		world.moves[move.id].commentable = move.commentable;
	}
	if (move.comment !== previousMove.comment) {
		world.moves[move.id].shouldScale = true;
		world.moves[move.id].scale = getMoveScale(0);
	}
};

const checkTargets = (perf, hits) => {
	if (!is(fromJS(perf), fromJS(S.perf))) {
		S.shouldDispatchStatsOnRAF = true;
		Object.keys(perf.snapshots).forEach(checkTarget.bind(this, perf));
		S.perf = perf;
	}
	if (!is(fromJS(hits), fromJS(S.hits))) {
		S.shouldDispatchStatsOnRAF = true;
		S.hits = hits;
	}
};

const checkMoves = (moves) => {
	if (!is(moves, S.moves)) {
		moves.forEach(checkMove);
		S.moves = moves;
	}
};

const checkWorld = () => {
	return (dispatch, getState) => {
		S.shouldCheckOnRAF = false;
		const state = getState();
		checkTargets(getPerformance(state), getHits(state));
		checkMoves(state.dance.get('moves'));
	};
};

export const positionTargets = () => {
	Object.keys(world.targets).forEach(direction => {
		if (world.targets[direction].shouldAnimate) {
			S.targetsTileIndexes[direction]++;
			if (S.targetsTileIndexes[direction] >= hTiles * vTiles) {
				world.targets[direction].shouldAnimate = false;
				S.targetsTileIndexes[direction] = 0;
			}
			world.targets[direction].textureOffset =
				getSpriteOffset(S.targetsTileIndexes[direction], hTiles, vTiles);
		}
	});
};

export const positionMoves = () => {
	Object.keys(world.moves).forEach((id, index) => {
		if (world.moves[id].visible) {
			world.moves[id].positionY =
				getPositionY(S.showTimes[id], Date.now() - S.choregraphyTime);
		}
		if (world.moves[id].shouldScale) {
			S.movesScaleIndexes[id]++;
			if (S.movesScaleIndexes[id] >= C.MOVE_HIT_FRAME_DURATION) {
				world.moves[id].shouldScale = false;
			}
			world.moves[id].scale = getMoveScale(S.movesScaleIndexes[id]);
		}
	});
};

const setHasTimeFalse = () => {
	S.hasTimeBeforeRAF = false;
};

const dispatchStats = () => {
	return (dispatch, getState) => {
		S.shouldDispatchStatsOnRAF = false;
		dispatchToMaster({
			type: C.STATS,
			data: {
				performance: S.perf,
				hits: S.hits
			}
		});
	};
};

export const onSlaveRequestAnimationFrame = () => {
	return (dispatch, getState) => {
		setTimeout(setHasTimeFalse, 5);
		S.hasTimeBeforeRAF = true;
		if (S.shouldCheckOnRAF) dispatch(checkWorld());
		if (S.shouldDispatchStatsOnRAF) dispatch(dispatchStats());
		positionTargets();
		positionMoves();
	};
};

export let stopListenToStore;

export const listenToStore = () => {
	return (dispatch, getState) => {
		const onStoreChange = () => {
			if (S.hasTimeBeforeRAF) dispatch(checkWorld());
			else S.shouldCheckOnRAF = true;
		};
		stopListenToStore = store.subscribe(onStoreChange);
	};
};
