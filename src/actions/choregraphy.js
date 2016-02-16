import C from '../constants';
import { getTutoChoregraphy, getRandomChoregraphy } from '../choregraphies';

export const getChoregraphyEndTime = (choregraphy) => {
	const moves = choregraphy.get('moves');
	const lastMove = moves.get(moves.size - 1);
	return lastMove.time;
};

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

const setMovesTimeouts = (forward = 0) => {
	return (dispatch, getState) => {
		const moves = getState().choregraphy.get('moves');
		const movesTimeouts = moves.map((move, index) => {
			const showTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_SHOW,
					index
				});
			}, move.showTime - forward);
			const hittableTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_HITTABLE,
					index
				});
			}, move.time - C.MOVE_TOLERANCE_OK - forward);
			const hideTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_HIDE,
					index
				});
			}, move.time - forward);
			const unhittableTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_UNHITTABLE,
					index
				});
			}, move.time + C.MOVE_TOLERANCE_OK - forward);
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

const timeoutNames = [
	'showTimeout',
	'hittableTimeout',
	'hideTimeout',
	'unhittableTimeout'
];

export const stopChoregraphy = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.choregraphy.get('moves').forEach((move) => {
			timeoutNames.forEach((timeoutName) => {
				clearTimeout(move[timeoutName]);
			});
		});
		dispatch({
			type: C.STEPS_RESET
		});
	};
};
