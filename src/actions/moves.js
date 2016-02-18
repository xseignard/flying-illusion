import C from '../constants';

export const getMovesEndTime = (moves) => {
	const lastMove = moves.get(moves.size - 1);
	return lastMove.time;
};

export const setMovesTimeouts = (forward = 0) => {
	return (dispatch, getState) => {
		const movesTimeouts = getState().dance.get('moves').map((move, index) => {
			const timeoutShow = setTimeout(() => {
				dispatch({
					type: C.MOVE_SHOW,
					index
				});
			}, move.showTime - forward);
			const timeoutCommentable = setTimeout(() => {
				dispatch({
					type: C.MOVE_COMMENTABLE,
					index
				});
			}, move.time - C.MOVE_TOLERANCE_OK - forward);
			const timeoutHide = setTimeout(() => {
				dispatch({
					type: C.MOVE_HIDE,
					index
				});
			}, move.time - forward);
			const timeoutUncommentable = setTimeout(() => {
				dispatch({
					type: C.MOVE_UNCOMMENTABLE,
					index
				});
			}, move.time + C.MOVE_TOLERANCE_OK - forward);
			return {
				timeoutShow,
				timeoutCommentable,
				timeoutHide,
				timeoutUncommentable
			};
		});
		dispatch({
			type: C.MOVES_TIMEOUTS,
			timeouts: movesTimeouts
		});
	};
};

const movesTimeouts = [
	'timeoutShow',
	'timeoutCommentable',
	'timeoutHide',
	'timeoutUncommentable'
];

export const stopMoves = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.dance.get('moves').forEach((move) => {
			movesTimeouts.forEach((timeout) => {
				clearTimeout(move[timeout]);
			});
		});
	};
};
