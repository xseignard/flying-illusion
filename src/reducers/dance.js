import { Map, List } from 'immutable';
import C from '../constants';

const defaultState = Map([
	['moves', List([])],
	['steps', List([])]
]);

const initMoves = (state, action) => {
	return state.set('moves', List(action.moves.map(move => {
		return Object.assign({}, move, {
			visible: false,
			commentable: false
		});
	})));
};

const setVisibility = (state, index, visible) => {
	return state.set('moves', state.get('moves').update(index, move => {
		return Object.assign({}, move, { visible });
	}));
};

const setCommentable = (state, index) => {
	return state.set('moves', state.get('moves').update(index, move => {
		return Object.assign({}, move, {
			commentable: true
		});
	}));
};

const setUncommentable = (state, index) => {
	if (!state.get('moves').get(index).commentable) return state;
	return state.set('moves', state.get('moves').update(index, move => {
		return Object.assign({}, move, {
			commentable: false,
			comment: 'missed',
			commentTime: move.time + C.MOVE_TOLERANCE_OK
		});
	}));
};

const setMovesTimeouts = (state, action) => {
	return state.set('moves', state.get('moves').map((move, index) => {
		return Object.assign({}, move, action.timeouts[index]);
	}));
};

const getFirstCommentableMoveIndex = (moves, action) => {
	const commentableMoveEntry = moves.findEntry((move) => {
		return (
			move.commentable &&
			move.direction === action.direction &&
			Math.abs(move.time - action.time) <= C.MOVE_TOLERANCE_OK
		);
	});
	if (!commentableMoveEntry) return null;
	return commentableMoveEntry[0];
};

const getMoveComment = (moveTime, stepTime) => {
	const timeDifference = Math.abs(moveTime - stepTime);
	if (timeDifference <= C.MOVE_TOLERANCE_EXCELLENT) {
		return 'excellent';
	}
	else if (timeDifference <= C.MOVE_TOLERANCE_GOOD) {
		return 'good';
	}
	else if (timeDifference <= C.MOVE_TOLERANCE_OK) {
		return 'ok';
	}
};

const handleStep = (state, action) => {
	const firstCommentableMoveIndex = getFirstCommentableMoveIndex(state.get('moves'), action);
	if (typeof firstCommentableMoveIndex !== 'number') {
		return state.set('steps', state.get('steps').push({
			direction: action.direction,
			comment: 'fail',
			commentTime: action.time,
		}));
	}
	return state.set('moves', state.get('moves').update(firstCommentableMoveIndex, move => {
		return Object.assign({}, move, {
			commentable: false,
			comment: getMoveComment(move.time, action.time),
			commentTime: action.time,
		});
	}));
};

export function dance(state = defaultState, action) {
	switch (action.type) {
		case C.CHOREGRAPHY:
			return initMoves(state, action);
		case C.MOVE_SHOW:
			return setVisibility(state, action.index, true);
		case C.MOVE_COMMENTABLE:
			return setCommentable(state, action.index);
		case C.MOVE_HIDE:
			return setVisibility(state, action.index, false);
		case C.MOVE_UNCOMMENTABLE:
			return setUncommentable(state, action.index);
		case C.MOVES_TIMEOUTS:
			return setMovesTimeouts(state, action);
		case C.STEP:
			return handleStep(state, action);
		case C.STEPS_RESET:
			return state.set('steps', List([]));
		default:
			return state;
	}
}
