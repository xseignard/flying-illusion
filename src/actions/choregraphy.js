import moment from 'moment';
import C from '../constants';
import choregraphySubs from '../choregraphies/choregraphy_1.srt';
import { flattenArray } from '../utils';

export const mapSubsToMoves = (subs) => {
	const nestedMoves = subs.map((sub) => {
		const showTime = moment.duration(sub.startTime).asMilliseconds();
		const time = moment.duration(sub.endTime).asMilliseconds();
		const directions = sub.text.split('#');
		const moves = directions.map((direction) => {
			const id = time + direction;
			return {
				id,
				showTime,
				time,
				direction,
			};
		});
		return moves;
	});
	return flattenArray(nestedMoves);
};

export const getChoregraphyEndTime = (moves) => {
	const lastMove = moves[moves.length - 1];
	return lastMove.time + 1000;
};

export const startChoregraphy = () => {
	return (dispatch, getState) => {
		const moves = mapSubsToMoves(choregraphySubs);
		dispatch({
			type: C.CHOREGRAPHY,
			moves
		});
		const movesTimeouts = moves.map((move) => {
			const showTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_SHOW,
					id: move.id
				});
			}, move.showTime);
			const playTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_PLAY,
					id: move.id
				});
			}, move.time - C.MOVE_RANGE_OK / 2);
			const hideTimeout = setTimeout(() => {
				dispatch({
					type: C.MOVE_HIDE,
					id: move.id
				});
			}, move.time + C.MOVE_RANGE_OK / 2);
			return {
				showTimeout,
				playTimeout,
				hideTimeout
			};
		});
		dispatch({
			type: C.MOVE_TIMEOUTS,
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
			clearTimeout(timeout.playTimeout);
			clearTimeout(timeout.hideTimeout);
		});
		clearTimeout(state.timeouts.choregraphyEnd);
	};
};
