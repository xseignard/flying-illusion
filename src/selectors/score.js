import { createSelector } from 'reselect';
import C from '../constants';
import { sum } from '../utils';

const directions = ['left', 'top', 'right', 'bottom'];

export const filterGameEventsByDirection = (gameEvent, direction) => {
	return gameEvent.filter((beat) => {
		return (beat.direction === direction);
	});
};

const sortGameEventsChronologically = (gameEvent) => {
	return gameEvent.sort((beat1, beat2) => {
		return beat1.time - beat2.time;
	});
};

const getDirectionGameEvents = (gameEvent) => {
	const directionGameEvents = {};
	directions.forEach((direction) => {
		directionGameEvents[direction] = filterGameEventsByDirection(gameEvent, direction);
	});
	return directionGameEvents;
};

const getDirectionScore = (gameEvent) => {
	let myScore = 0;
	gameEvent.every((beat, index) => {
		const isStepChoregraphy = typeof beat.showTime === 'number';
		// basic version of algorithm just takes moves into account
		if (!isStepChoregraphy) {
			return true;
		}
		const previousGameEvent = gameEvent[index - 1];
		const nextGameEvent = gameEvent[index + 1];
		let isPreviousGameEventStep = false;
		let isNextGameEventStep = false;
		if (previousGameEvent) {
			isPreviousGameEventStep = typeof previousGameEvent.showTime !== 'number';
		}
		if (nextGameEvent) {
			isNextGameEventStep = typeof nextGameEvent.showTime !== 'number';
		}
		if (!isPreviousGameEventStep && !isNextGameEventStep) {
			return true;
		}
		const timeDifferences = [];
		if (previousGameEvent && isPreviousGameEventStep) {
			timeDifferences.push(beat.time - previousGameEvent.time);
		}
		if (nextGameEvent && isNextGameEventStep) {
			timeDifferences.push(nextGameEvent.time - beat.time);
		}
		const minTimeDifference = Math.min(...timeDifferences);
		if (minTimeDifference < C.MOVE_RANGE_OK / 2) {
			myScore = myScore + 1;
		}
		return true;
	});
	return myScore;
};

const getDirectionScores = (directionGameEvents) => {
	return directions.map((direction) => {
		return getDirectionScore(directionGameEvents[direction]);
	});
};

const getChoregraphy = (state) => state.choregraphy;
const getSteps = (state) => state.steps;

export const getScore = createSelector(
	[getChoregraphy, getSteps],
	(choregraphy, steps) => {
		const allGameEvents = choregraphy.concat(steps);
		const orderedGameEvents = sortGameEventsChronologically(allGameEvents);
		const directionGameEvents = getDirectionGameEvents(orderedGameEvents);
		const directionScores = getDirectionScores(directionGameEvents);
		return sum(directionScores);
	}
);
