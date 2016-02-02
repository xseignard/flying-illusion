import C from '../../constants';
import { updateScore } from '../score';
import { getMoves, getChoregraphyEndTime } from './helpers';

export const startChoregraphy = () => {
	return (dispatch, getState) => {
		const moves = getMoves();
		dispatch({
			type: C.MOVES,
			moves
		});
		const movesTimeouts = moves.map((step) => {
			const showTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE,
					id: step.id,
					status: 'shown'
				});
			}, step.showTime);
			const playableTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE,
					id: step.id,
					status: 'playable'
				});
			}, step.time - C.MOVE_RANGE_OK / 2);
			const hideTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE,
					id: step.id,
					status: 'hidden'
				});
				dispatch(updateScore());
			}, step.time + C.MOVE_RANGE_OK / 2);
			return {
				showTimeout,
				playableTimeout,
				hideTimeout
			};
		});
		dispatch({
			type: C.MOVES_TIMEOUTS,
			timeouts: movesTimeouts
		});
		dispatch({
			type: C.GAME_TIMEOUT,
			timeout: setTimeout(() => {
				dispatch({
					type: C.GAME,
					status: 'end'
				});
			}, getChoregraphyEndTime(moves))
		});
	};
};

export const stopChoregraphy = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.timeouts.moves.forEach((timeout) => {
			clearTimeout(timeout.showTimeout);
			clearTimeout(timeout.hideTimeout);
		});
		clearTimeout(state.timeouts.choregraphyEnd);
	};
};
