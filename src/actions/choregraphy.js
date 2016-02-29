import C from '../constants';
import { sendToSlave } from '../master';
import { getTutoChoregraphy, getRandomChoregraphy } from '../choregraphies';

const setTutoChoregraphy = () => {
	return (dispatch, getState) => {
		const tutoChoregraphy = getTutoChoregraphy();
		dispatch({
			type: C.CHOREGRAPHY,
			time: Date.now() - C.TUTO_FORWARD_TIME,
			name: tutoChoregraphy.name,
			moves: tutoChoregraphy.moves
		});
	};
};

const setRandomChoregraphy = () => {
	return (dispatch, getState) => {
		const randomChoregraphy = getRandomChoregraphy();
		dispatch({
			type: C.CHOREGRAPHY,
			time: Date.now(),
			name: randomChoregraphy.name,
			moves: randomChoregraphy.moves
		});
	};
};

export const getChoregraphyEndTime = (moves) => {
	return moves.last().time + C.MOVES_END_DELAY;
};

export const setMovesTimeouts = (forward = 0) => {
	return (dispatch, getState) => {
		sendToSlave({
			function: 'setMovesTimeouts',
			forward
		});
	};
};

export const startTutoChoregraphy = () => {
	return (dispatch, getState) => {
		dispatch(setTutoChoregraphy());
		dispatch(setMovesTimeouts(C.TUTO_FORWARD_TIME));
	};
};

export const startChoregraphy = () => {
	return (dispatch, getState) => {
		dispatch(setRandomChoregraphy());
		dispatch(setMovesTimeouts());
	};
};

export const resetChoregraphy = () => {
	return (dispatch, getState) => {
		sendToSlave({ function: 'stopMoves' });
		dispatch({
			type: C.CHOREGRAPHY_RESET
		});
	};
};
