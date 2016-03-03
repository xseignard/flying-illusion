import { createSelector } from 'reselect';

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
		score: 0,
		comboAddition: null
	},
	miss: {
		score: 0,
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

const getSnapshots = (directionsComments) => {
	const snapshots = {};
	Object.keys(directionsComments).forEach((direction) => {
		const comment = directionsComments[direction];
		snapshots[direction] = {
			lastComment: comment.last,
			commentCount: comment[comment.last]
		};
	});
	return snapshots;
};

const getPerformances = (events) => {
	let combo = 1;
	let comboMax = 1;
	let score = 0;
	let progression = 0;
	const comments = {
		ok: 0,
		good: 0,
		excellent: 0,
		fail: 0,
		miss: 0,
		last: events.size > 0 ? events.last().comment : ''
	};
	const directionsComments = {
		left: { ok: 0, good: 0, excellent: 0, fail: 0, miss: 0, last: '' },
		top: { ok: 0, good: 0, excellent: 0, fail: 0, miss: 0, last: '' },
		bottom: { ok: 0, good: 0, excellent: 0, fail: 0, miss: 0, last: '' },
		right: { ok: 0, good: 0, excellent: 0, fail: 0, miss: 0, last: '' },
	};
	events.forEach((event, index) => {
		const comboAddition = performanceTable[event.comment].comboAddition;
		combo = comboAddition ? combo + comboAddition : 1;
		comboMax = Math.max(comboMax, combo);
		score += performanceTable[event.comment].score * combo;
		progression += performanceTable[event.comment].score;
		comments[event.comment]++;
		directionsComments[event.direction][event.comment]++;
		directionsComments[event.direction].last = event.comment;
	});
	const snapshots = getSnapshots(directionsComments);
	return {
		combo,
		comboMax,
		score,
		progression,
		comments,
		snapshots
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
