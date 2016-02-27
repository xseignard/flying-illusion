import C from '../constants';
import { sendToMaster } from '../utils/utils-slave';

export const setMovesTimeouts = (forward = 0) => {
	return (dispatch, getState) => {
		const moves = getState().dance.get('moves').toArray();
		const movesTimeouts = moves.map((move, index) => {
			const timeoutShow = setTimeout(() => {
				sendToMaster({
					type: C.MOVE_SHOW,
					index
				});
			}, move.showTime - forward);
			const timeoutCommentable = setTimeout(() => {
				sendToMaster({
					type: C.MOVE_COMMENTABLE,
					index
				});
			}, move.time - C.MOVE_TOLERANCE_OK - forward);
			const timeoutHide = setTimeout(() => {
				sendToMaster({
					type: C.MOVE_HIDE,
					index
				});
			}, move.time - forward);
			const timeoutUncommentable = setTimeout(() => {
				sendToMaster({
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
		sendToMaster({
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
		const moves = getState().dance.get('moves').toArray();
		moves.forEach((move) => {
			movesTimeouts.forEach((timeout) => {
				clearTimeout(move[timeout]);
			});
		});
	};
};
