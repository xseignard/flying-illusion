import C from '../constants';
import { setMovesTimeouts } from './moves';
import { getTutoChoregraphy, getRandomChoregraphy } from '../choregraphies';

const setTutoChoregraphy = () => {
	return (dispatch, getState) => {
		const tutoChoregraphy = getTutoChoregraphy();
		dispatch({
			type: C.CHOREGRAPHY,
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
			name: randomChoregraphy.name,
			moves: randomChoregraphy.moves
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
		dispatch({
			type: C.CHOREGRAPHY_RESET
		});
	};
};
