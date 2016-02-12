import C from '../constants';
import { getRandomChoregraphy } from '../choregraphies';

export const getChoregraphyEndTime = (moves) => {
	const lastMove = moves.get(moves.size - 1);
	return lastMove.time;
};

const setRandomChoregraphy = () => {
	return (dispatch, getState) => {
		const randomChoregraphy = getRandomChoregraphy();
		dispatch({
			type: C.CHOREGRAPHY,
			moves: randomChoregraphy.moves
		});
	};
};

const setMovesTimeouts = () => {
	return (dispatch, getState) => {
		const moves = getState().choregraphy;
		const movesTimeouts = moves.map((move, index) => {
			const showTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_SHOW,
					index
				});
			}, move.showTime);
			const hideTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_HIDE,
					index
				});
			}, move.time);
			return {
				showTimeout,
				hideTimeout
			};
		});
		dispatch({
			type: C.MOVES_TIMEOUTS,
			timeouts: movesTimeouts
		});
	};
};

export const startChoregraphy = () => {
	return (dispatch, getState) => {
		dispatch(setRandomChoregraphy());
		dispatch(setMovesTimeouts());
	};
};

export const stopChoregraphy = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.choregraphy.forEach((move) => {
			['showTimeout', 'hideTimeout']
				.forEach((timeoutName) => {
					clearTimeout(move.get(timeoutName));
				});
		});
		dispatch({
			type: C.STEPS_RESET
		});
	};
};
