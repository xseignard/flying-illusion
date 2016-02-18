import C from '../constants';

export const getMovesEndTime = (moves) => {
	const lastMove = moves.get(moves.size - 1);
	return lastMove.time;
};

export const setMovesTimeouts = (forward = 0) => {
	return (dispatch, getState) => {
		const movesTimeouts = getState().moves.map((move, index) => {
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

const movesTimeouts = [
	'showTimeout',
	'hittableTimeout',
	'hideTimeout',
	'unhittableTimeout'
];

export const stopMoves = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.moves.forEach((move) => {
			movesTimeouts.forEach((timeout) => {
				clearTimeout(move[timeout]);
			});
		});
	};
};
