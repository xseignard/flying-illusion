import { createSelector } from 'reselect';
import C from '../constants';

const filterOutIdleMoves = (moves) => {
	return moves.filter(move => {
		return move.status !== 'idle';
	});
};

const sortEventsChronologically = (events) => {
	return events.sort((event1, event2) => {
		return event1.time - event2.time;
	});
};

const isMove = (event) => {
	return event && typeof event.showTime !== 'undefined';
};

const getNextEventInSameDirection = (events, index) => {
	return events.find((value, key) => {
		return (
			key > index &&
			value.direction === events.get(index).direction
		);
	});
};

/*
	### Performance algorithm ###

	### Main principles ###
	- Moves and steps are merged and sorted chronologically
	to form a List of "events"
	- Each event in the List is assigned a score
	and the sum of these scores is returned.
	- The score of an event depends on its relationship
	to the next event in the same direction.

*/

const getPerformances = (events) => {
	let score = 0;
	let ok = 2;
	let good = 3;
	let excellent = 4;
	let combo = 1;
	let comment;
	const targetState = {
		left: 'unknown',
		top: 'unknown',
		bottom: 'unknown',
		right: 'unknown',
	};

	const ignoreNextEvent = {
		left: false,
		top: false,
		bottom: false,
		right: false,
	};
	events.every((event, index) => {
		/*
			Event has already been counted from relationship
			with previous event
		*/
		if (ignoreNextEvent[event.direction]) {
			ignoreNextEvent[event.direction] = false;
			return true;
		}

		const nextEvent = getNextEventInSameDirection(events, index);
		/*
			Last event in this direction
		*/
		if (!nextEvent) {
			if (isMove(event)) {
				if (event.status === 'unhittable') {
					score -= 10;
					combo = 1;
					comment = 'missed';
					targetState[event.direction] = 'missed';
				}
				return true;
			}
			score -= 1;
			combo = 1;
			comment = 'fail';
			targetState[event.direction] = 'fail';
			return true;
		}

		/*
			Move has not been hit
		*/
		if (
			isMove(event) &&
			isMove(nextEvent)
		) {
			if (event.status === 'unhittable') {
				score -= 10;
				combo = 1;
				comment = 'missed';
				targetState[event.direction] = 'missed';
			}
			return true;
		}

		const timeDifference = nextEvent.time - event.time;
		/*
			Step has not hit a move
		*/
		if (
			(
				!isMove(event) &&
				!isMove(nextEvent)
			) ||
			timeDifference > C.MOVE_TOLERANCE_OK
		) {
			score -= 1;
			combo = 1;
			comment = 'fail';
			targetState[event.direction] = 'fail';
			return true;
		}

		/*
			Move is hit by step or step hits move
		*/
		let thisScore;
		ignoreNextEvent[event.direction] = true;
		if (timeDifference < C.MOVE_TOLERANCE_EXCELLENT) {
			thisScore = 4;
			excellent = excellent + 1;
			combo = combo + 8;
			comment = 'excellent';
			targetState[event.direction] = 'excellent';
		}
		else if (timeDifference < C.MOVE_TOLERANCE_GOOD) {
			thisScore = 2;
			good = good + 1;
			combo = combo + 4;
			comment = 'good';
			targetState[event.direction] = 'good';
		}
		else if (timeDifference <= C.MOVE_TOLERANCE_OK) {
			thisScore = 1;
			ok = ok + 1;
			combo = combo + 2;
			comment = 'ok';
			targetState[event.direction] = 'ok';
		}
		score += thisScore * combo;
		return true;
	});
	return {
		score,
		ok,
		good,
		excellent,
		combo,
		comment,
		targetState
	};
};

const getMoves = (state) => state.moves;
const getSteps = (state) => state.steps;

export const getPerformance = createSelector(
	[getMoves, getSteps],
	(moves, steps) => {
		const activeMoves = filterOutIdleMoves(moves);
		const allEvents = activeMoves.concat(steps);
		const orderedEvents = sortEventsChronologically(allEvents);
		return getPerformances(orderedEvents);
	}
);
