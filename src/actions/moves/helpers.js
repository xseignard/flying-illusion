import moment from 'moment';
import choregraphySubs from '../../choregraphies/choregraphy_1.srt';
import { flattenArray } from '../../utils';

export const getChoregraphyEndTime = (moves) => {
	const lastMoveTime = moves[moves.length - 1].time;
	const choregraphyEndTime = parseInt(lastMoveTime, 10) + 1000;
	return choregraphyEndTime;
};

export const mapSubsToMoves = (subs) => {
	const nestedMoves = subs.map((sub) => {
		const showTime = moment.duration(sub.startTime).asMilliseconds();
		const time = moment.duration(sub.endTime).asMilliseconds();
		const directions = sub.text.split('#');
		const moves = directions.map((direction) => {
			const id = time + direction;
			return {
				status: 'initialized',
				id,
				direction,
				showTime,
				time
			};
		});
		return moves;
	});
	return flattenArray(nestedMoves);
};

export const getActiveMoves = (moves) => {
	return moves.filter((move) => {
		return move.status.match(/shown|playable/);
	});
};

export const getMoves = () => {
	return mapSubsToMoves(choregraphySubs);
};
