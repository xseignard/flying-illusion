import { createSelector } from 'reselect';
import C from '../constants';
import { sum } from '../utils';

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

const getNextEventInSameDirection = (events, event, index) => {
	return events.find((value, key) => {
		return (
			key > index &&
			value.direction === event.direction
		);
	});
};

const getPerformances = (events) => {
	const ignoreNextEvent = {
		left: false,
		top: false,
		bottom: false,
		right: false,
	};
	let combo = 1;
	let comment;
	const score = sum(events.map((event, index) => {
		if (ignoreNextEvent[event.direction]) {
			ignoreNextEvent[event.direction] = false;
			return 0;
		}
		const nextEvent = getNextEventInSameDirection(events, event, index);
		if (!nextEvent) {
			if (isMove(event)) {
				if (event.status === 'hide') {
					combo = 1;
					comment = 'missed';
					return -10;
				}
				return 0;
			}
			combo = 1;
			comment = 'fail';
			return -1;
		}
		if (
			isMove(event) &&
			isMove(nextEvent)
		) {
			combo = 1;
			comment = 'missed';
			return -10;
		}
		const timeDifference = nextEvent.time - event.time;
		if (
			(
				!isMove(event) &&
				!isMove(nextEvent)
			) ||
			timeDifference >= C.MOVE_TOLERANCE_OK
		) {
			combo = 1;
			comment = 'fail';
			return -1;
		}
		let thisScore;
		ignoreNextEvent[event.direction] = true;
		if (timeDifference < C.MOVE_TOLERANCE_EXCELLENT) {
			thisScore = 4;
			combo = combo * 8;
			comment = 'excellent';
		}
		else if (timeDifference < C.MOVE_TOLERANCE_GOOD) {
			thisScore = 2;
			combo = combo * 4;
			comment = 'good';
		}
		else if (timeDifference < C.MOVE_TOLERANCE_OK) {
			thisScore = 1;
			combo = combo * 2;
			comment = 'ok';
		}
		return thisScore * combo;
	}));
	return {
		score,
		combo,
		comment
	};
};

const getChoregraphy = (state) => state.choregraphy;
const getSteps = (state) => state.steps;

export const getPerformance = createSelector(
	[getChoregraphy, getSteps],
	(moves, steps) => {
		const activeMoves = filterOutIdleMoves(moves);
		const allEvents = activeMoves.concat(steps);
		const orderedEvents = sortEventsChronologically(allEvents);
		return getPerformances(orderedEvents);
	}
);
