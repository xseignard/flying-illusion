import moment from 'moment';
import C from '../constants';
import choregraphies from '../choregraphies';
import { flattenArray } from '../utils';

export const mapSubsToMoves = (subs) => {
	const nestedMoves = subs.map((sub) => {
		const directions = sub.text.split('#');
		const showTime = moment.duration(sub.startTime).asMilliseconds();
		const time = moment.duration(sub.endTime).asMilliseconds();
		const moves = directions.map((direction) => {
			return {
				direction,
				showTime,
				time,
			};
		});
		return moves;
	});
	return flattenArray(nestedMoves);
};

export const getChoregraphyEndTime = (moves) => {
	const lastMove = moves.get(moves.size - 1);
	return lastMove.time;
};

export const startChoregraphy = () => {
	const randomChoregraphy = choregraphies[Math.floor(Math.random() * choregraphies.length)];
	return (dispatch, getState) => {
		const moves = mapSubsToMoves(randomChoregraphy.steps);
		dispatch({
			type: C.CHOREGRAPHY,
			moves
		});
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
			}, move.time + C.MOVE_TOLERANCE_OK);
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

export const stopChoregraphy = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.choregraphy.forEach((move) => {
			['showTimeout', 'hideTimeout']
				.forEach((timeoutName) => {
					clearTimeout(move.get(timeoutName));
				});
		});
	};
};
