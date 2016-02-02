import C from '../constants';
import { getChoregraphyEndTime } from './choregraphy';

export const startArrows = () => {
	return (dispatch, getState) => {
		const moves = getState().choregraphy;
		const arrowsTimeouts = moves.map((move) => {
			const addTimeout = setTimeout(() => {
				dispatch({
					type: C.ARROW_ADD,
					id: move.id,
					direction: move.direction,
					time: move.time,
					duration: move.time - move.showTime
				});
			}, move.showTime);
			const playableTimeout = setTimeout(() => {
				dispatch({
					type: C.ARROW_STATUS,
					id: move.id,
					status: 'playable'
				});
			}, move.time - C.MOVE_RANGE_OK / 2);
			const removeTimeout = setTimeout(() => {
				dispatch({
					type: C.ARROW_REMOVE,
					id: move.id
				});
			}, move.time + C.MOVE_RANGE_OK / 2);
			return {
				addTimeout,
				playableTimeout,
				removeTimeout
			};
		});
		dispatch({
			type: C.ARROWS_TIMEOUTS,
			timeouts: arrowsTimeouts
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

export const stopArrows = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.timeouts.arrows.forEach((timeout) => {
			clearTimeout(timeout.addTimeout);
			clearTimeout(timeout.playableTimeout);
			clearTimeout(timeout.removeTimeout);
		});
		clearTimeout(state.timeouts.choregraphyEnd);
	};
};
