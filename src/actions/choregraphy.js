import C from '../constants';
import { sendToSlave } from '../utils/master';
import { getTutoChoregraphy, getRandomChoregraphy } from '../choregraphies';

export const setTutoChoregraphy = () => {
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

export const setRandomChoregraphy = () => {
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

export const setGameTimeouts = (isTuto) => {
	return (dispatch, getState) => {
		sendToSlave({
			function: 'setGameTimeouts',
			isTuto
		});
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
