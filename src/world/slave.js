import { is, fromJS } from 'immutable';
import { store } from '../stores/slave';
import { getPositionY, getSpriteOffset } from '../components/Webgl/common/helpers';
import { getPerformance } from '../selectors/performance';
import C from '../constants';

const hTiles = 8;
const vTiles = 9;
const commentSuccess = /ok|good|excellent/;

/*
	world: sent to Master via postMessage
	S: mutable state to optimize performance
*/

export const world = {
	moves: {},
	targets: {
		left: {},
		top: {},
		bottom: {},
		right: {},
	}
};

export const S = {
	choregraphyTime: null, // Integer
	perf: null, // object
	moves: null, // immutable List
	hasTimeBeforeRAF: false,
	shouldCheckOnRAF: false,
	shouldDispatchPerformanceOnRAF: false,
	targetsTileIndexes: { left: 0, top: 0, bottom: 0, right: 0 },
	showTimes: {},
};

export const initWorld = () => {
	return (dispatch, getState) => {
		const state = getState();
		S.perf = getPerformance(state);
		S.moves = state.dance.get('moves');
		world.moves = {};
		world.showTimes = {};
		S.moves.forEach(move => {
			world.moves[move.id] = {};
			S.showTimes[move.id] = move.showTime;
		});
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
};

const checkTargets = (perf) => {
	if (!is(fromJS(perf), fromJS(S.perf))) {
		S.shouldDispatchPerformanceOnRAF = true;
		Object.keys(perf.snapshots).forEach(checkTarget.bind(this, perf));
		S.perf = perf;
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
		checkTargets(getPerformance(state));
		checkMoves(state.dance.get('moves'));
	};
};

export const positionTargets = () => {
	Object.keys(world.targets).forEach(direction => {
		if (world.targets[direction].shouldAnimate) {
			S.targetsTileIndexes[direction]++;
			if (
				S.targetsTileIndexes[direction] >= hTiles * vTiles
			) {
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
	});
};

const setHasTimeFalse = () => {
	S.hasTimeBeforeRAF = false;
};

const dispatchPerformance = () => {
	return (dispatch, getState) => {
		S.shouldDispatchPerformanceOnRAF = false;
		dispatch({
			type: C.PERFORMANCE,
			data: S.perf
		});
	};
};

export const onSlaveRequestAnimationFrame = () => {
	return (dispatch, getState) => {
		setTimeout(setHasTimeFalse, 5);
		S.hasTimeBeforeRAF = true;
		if (S.shouldCheckOnRAF) dispatch(checkWorld());
		if (S.shouldDispatchPerformanceOnRAF) dispatch(dispatchPerformance());
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
