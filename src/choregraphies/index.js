import moment from 'moment';
import C from '../constants';
import U from '../utils';
import inTraining from './In_Training.new.srt';
import lastResistance from './Last_Resistance.new.srt';
import theBattle from './The_Battle.new.srt';
import theFlyingHeroes from './The_Flying_Heroes.new.srt';

const mapSubsToMoves = (subs) => {
	const nestedMoves = subs.map((sub) => {
		const directions = sub.text.split('#');
		const showTime = moment.duration(sub.startTime).asMilliseconds();
		const time = moment.duration(sub.endTime).asMilliseconds();
		const moves = directions.map((direction) => {
			const id = `${time}_${direction}`;
			return {
				id,
				direction,
				showTime,
				time,
			};
		});
		return moves;
	});
	return U.flattenArray(nestedMoves);
};

const getTutoMoves = (moves) => {
	return moves.filter((move) => {
		return move.time < C.TUTO_END_TIME + C.MOVE_DURATION;
	});
};

export const getTutoChoregraphy = () => {
	return {
		name: 'The_Flying_Heroes',
		moves: getTutoMoves(mapSubsToMoves(theFlyingHeroes))
	};
};

export const choregraphies = [
	{
		name: 'In_Training',
		moves: mapSubsToMoves(inTraining)
	},
	{
		name: 'Last_Resistance',
		moves: mapSubsToMoves(lastResistance)
	},
	{
		name: 'The_Battle',
		moves: mapSubsToMoves(theBattle)
	},
	{
		name: 'The_Flying_Heroes',
		moves: mapSubsToMoves(theFlyingHeroes)
	}
];

export const getRandomChoregraphy = () => {
	const randomIndex = Math.floor(Math.random() * choregraphies.length);
	return choregraphies[randomIndex];
};
