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

const getTargets = (directions) => {
	const targets = {};
	Object.keys(directions).forEach((direction) => {
		targets[direction] = {
			lastComment: directions[direction].lastComment,
			commentNumber: directions[direction][direction.lastComment]
		};
	});
	return targets;
};

const getPerformances = (events) => {
	let combo = 1;
	let score = 0;
	const directions = {
		left: { ok: 0, good: 0, excellent: 0, lastComment: '' },
		top: { ok: 0, good: 0, excellent: 0, lastComment: '' },
		bottom: { ok: 0, good: 0, excellent: 0, lastComment: '' },
		right: { ok: 0, good: 0, excellent: 0, lastComment: '' },
	};
	const commentsCount = { ok: 0, good: 0, excellent: 0 };
	events.forEach((event, index) => {
		const comboAddition = performanceTable[event.comment].comboAddition;
		combo = comboAddition ? combo + comboAddition : 1;
		score += performanceTable[event.comment].score * combo;
		directions[event.direction][event.comment]++;
		directions[event.direction].lastComment = event.comment;
		commentsCount[event.comment]++;
	});
	const lastComment = events.size > 0 ? events.last().comment : '';
	const targets = getTargets(directions);
	return {
		combo,
		score,
		commentsCount,
		lastComment,
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
