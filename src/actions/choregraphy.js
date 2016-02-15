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
			name: randomChoregraphy.name,
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
			const hittableTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_HITTABLE,
					index
				});
			}, move.time - C.MOVE_TOLERANCE_OK);
			const hideTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_HIDE,
					index
				});
			}, move.time);
			const unhittableTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_UNHITTABLE,
					index
				});
			}, move.time + C.MOVE_TOLERANCE_OK);
			return {
				showTimeout,
				hittableTimeout,
				hideTimeout,
				unhittableTimeout
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

const timeoutNames = [
	'showTimeout',
	'hittableTimeout',
	'hideTimeout',
	'unhittableTimeout'
];

export const stopChoregraphy = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.choregraphy.forEach((move) => {
			timeoutNames.forEach((timeoutName) => {
				clearTimeout(move.get(timeoutName));
			});
		});
		dispatch({
			type: C.STEPS_RESET
		});
	};
};
