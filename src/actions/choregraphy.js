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

export const setChoregraphy = () => {
	return (dispatch, getState) => {
		const moves = mapSubsToMoves(choregraphySubs);
		dispatch({
			type: C.CHOREGRAPHY,
			moves
		});
	};
};
