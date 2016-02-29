/* Runs in slave thread */

import C from '../constants';

export const setMovesTimeouts = (forward = 0) => {
	return (dispatch, getState) => {
		const moves = getState().dance.get('moves').toArray();
		const movesTimeouts = moves.map((move, index) => {
			const timeoutShow = setTimeout(() => {
				dispatch({
					type: C.MOVE_SHOW,
					index,
					hideFromMaster: true,
					log: true
				});
			}, move.showTime - forward);
			const timeoutCommentable = setTimeout(() => {
				dispatch({
					type: C.MOVE_COMMENTABLE,
					index,
					hideFromMaster: true,
					log: true
				});
			}, move.time - C.MOVE_TOLERANCE_OK - forward);
			const timeoutUncommentable = setTimeout(() => {
				dispatch({
					type: C.MOVE_UNCOMMENTABLE,
					index,
					hideFromMaster: true,
					log: true
				});
			}, move.time + C.MOVE_TOLERANCE_OK - forward);
			const timeoutHide = setTimeout(() => {
				dispatch({
					type: C.MOVE_HIDE,
					index,
					hideFromMaster: true,
					log: true
				});
			}, move.time + 1000 - forward);
			return {
				timeoutShow,
				timeoutCommentable,
				timeoutUncommentable,
				timeoutHide,
			};
		});
		dispatch({
			type: C.MOVES_TIMEOUTS,
			timeouts: movesTimeouts,
			hideFromMaster: true,
			log: true
		});
	};
};

const movesTimeouts = [
	'timeoutShow',
	'timeoutCommentable',
	'timeoutUncommentable',
	'timeoutHide',
];

export const stopMoves = () => {
	return (dispatch, getState) => {
		const moves = getState().dance.get('moves').toArray();
		moves.forEach((move) => {
			movesTimeouts.forEach((timeout) => {
				clearTimeout(move[timeout]);
			});
		});
	};
};