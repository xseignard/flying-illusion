import C from '../constants';
import { sendToSlave } from '../utils/utils-master';

export const getMovesEndTime = (moves) => {
	return moves.last().time + C.MOVES_END_DELAY;
};

export const setMovesTimeouts = (forward = 0) => {
	return (dispatch, getState) => {
		dispatch(sendToSlave({
			function: 'setMovesTimeouts',
			forward
		}));
	};
};

export const stopMoves = () => {
	return (dispatch, getState) => {
		dispatch(sendToSlave({ function: 'stopMoves' }));
	};
};
