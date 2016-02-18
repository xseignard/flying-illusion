import { createSelector } from 'reselect';

const directions = ['left', 'top', 'bottom', 'right'];

const performanceTable = {
	ok: {
		score: 1,
		comboAddition: 1
	},
	good: {
		score: 2,
		comboAddition: 2
	},
	excellent: {
		score: 4,
		comboAddition: 4
	},
	fail: {
		score: -1,
		comboAddition: null
	},
	missed: {
		score: -10,
		comboAddition: null
	},
};

const getCommentedEvents = (events) => {
	return events.filter(event => {
		return typeof event.comment === 'string';
	});
};

const sortEventsChronologically = (events) => {
	return events.sort((event1, event2) => {
		return event1.commentTime - event2.commentTime;
	});
};

const splitEventsByDirection = (events) => {
	const splitEvents = {};
	directions.forEach(direction => {
		splitEvents[direction] = [];
	});
	events.forEach(event => {
		splitEvents[event.direction].push(event);
	});
	return splitEvents;
};

const getLastCommentsByDirection = (events) => {
	const splitEvents = splitEventsByDirection(events);
	const targets = {};
	directions.forEach(direction => {
		const directionEvents = splitEvents[direction];
		const lastDirectionEvent = directionEvents[directionEvents.length - 1];
		targets[direction] = lastDirectionEvent ? lastDirectionEvent.comment : '';
	});
	return targets;
};

const getPerformances = (events) => {
	let combo = 1;
	let score = 0;
	let ok = 0;
	let good = 0;
	let excellent = 0;
	events.forEach((event, index) => {
		const comboAddition = performanceTable[event.comment].comboAddition;
		combo = comboAddition ? combo + comboAddition : 1;
		score += performanceTable[event.comment].score * combo;
		ok = event.comment === 'ok' ? ok + 1 : ok;
		good = event.comment === 'good' ? good + 1 : good;
		excellent = event.comment === 'excellent' ? excellent + 1 : excellent;
	});
	const comment = events.size > 0 ? events.last().comment : '';
	const targets = getLastCommentsByDirection(events);
	return {
		combo,
		score,
		ok,
		good,
		excellent,
		comment,
		targets
	};
};

const getDance = (state) => state.dance;

export const getPerformance = createSelector(
	[getDance],
	(dance) => {
		const scoringMoves = getCommentedEvents(dance.get('moves'));
		const scoringSteps = getCommentedEvents(dance.get('steps'));
		const scoringEvents = scoringMoves.concat(scoringSteps);
		const orderedEvents = sortEventsChronologically(scoringEvents);
		return getPerformances(orderedEvents);
	}
);
