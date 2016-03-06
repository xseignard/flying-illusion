import C from '../constants';
import { sendToSlave } from '../threads/master';
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

const findChoregraphyByName = (name) => {
	return C.CHOREGRAPHIES.find(choregraphy => {
		return choregraphy.name === name;
	});
};

export const getChoregraphyEndTime = (isTuto) => {
	return (dispatch, getState) => {
		const state = getState();
		if (isTuto) return C.TUTO_END_TIME - C.TUTO_FORWARD_TIME;
		return findChoregraphyByName(state.choregraphy.get('name')).duration;
	};
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
