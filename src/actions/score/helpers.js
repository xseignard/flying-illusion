import C from '../../constants';
import { sum } from '../../utils';

const directions = ['left', 'top', 'right', 'bottom'];

export const filterBeatsByDirection = (beats, direction) => {
	return beats.filter((beat) => {
		return (beat.direction === direction);
	});
};

const sortBeatsChronologically = (beats) => {
	return beats.sort((beat1, beat2) => {
		return beat1.time - beat2.time;
	});
};

const getDirectionBeats = (beats) => {
	const directionBeats = {};
	directions.forEach((direction) => {
		directionBeats[direction] = filterBeatsByDirection(beats, direction);
	});
	return directionBeats;
};

const getDirectionScore = (beats) => {
	let score = 0;
	beats.every((beat, index) => {
		const isStepChoregraphy = typeof beat.showTime === 'number';
		// basic version of algorithm just takes moves into account
		if (!isStepChoregraphy) {
			return true;
		}
		const previousBeat = beats[index - 1];
		const nextBeat = beats[index + 1];
		let isPreviousBeatStep = false;
		let isNextBeatStep = false;
		if (previousBeat) {
			isPreviousBeatStep = typeof previousBeat.showTime !== 'number';
		}
		if (nextBeat) {
			isNextBeatStep = typeof nextBeat.showTime !== 'number';
		}
		if (!isPreviousBeatStep && !isNextBeatStep) {
			return true;
		}
		const timeDifferences = [];
		if (previousBeat && isPreviousBeatStep) {
			timeDifferences.push(beat.time - previousBeat.time);
		}
		if (nextBeat && isNextBeatStep) {
			timeDifferences.push(nextBeat.time - beat.time);
		}
		const minTimeDifference = Math.min(...timeDifferences);
		if (minTimeDifference < C.MOVE_RANGE_OK / 2) {
			score = score + 1;
		}
		return true;
	});
	return score;
};

const getDirectionScores = (directionBeats) => {
	return directions.map((direction) => {
		return getDirectionScore(directionBeats[direction]);
	});
};

export const getScore = (moves, steps) => {
	const allBeats = moves.concat(steps);
	const orderedBeats = sortBeatsChronologically(allBeats);
	const directionBeats = getDirectionBeats(orderedBeats);
	const directionScores = getDirectionScores(directionBeats);
	return sum(directionScores);
};
