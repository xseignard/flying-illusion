import C from '../constants';
import { sum } from '../utils/utils';
import { filterStepsByDirection } from '../utils/choreography';

const directions = ['left', 'top', 'right', 'bottom'];

const sortStepsChronologically = (steps) => {
	steps.sort((step1, step2) => {
		const step1Time = step1.time ? step1.time : step1.end;
		const step2Time = step2.time ? step2.time : step2.end;
		return step1Time - step2Time;
	});
};

const getDirectionSteps = (steps) => {
	return {
		left: filterStepsByDirection(steps, 'left'),
		top: filterStepsByDirection(steps, 'top'),
		right: filterStepsByDirection(steps, 'right'),
		bottom: filterStepsByDirection(steps, 'bottom')
	};
};

const getDirectionScore = (steps) => {
	let score = 0;
	steps.every((step, index) => {
		const isStepTarget = typeof step.end === 'number';
		// basic version of algorithm just takes targetSteps into account
		if (!isStepTarget) {
			return true;
		}
		const previousStep = steps[index - 1];
		const nextStep = steps[index + 1];
		let isPreviousStepPlayer = false;
		let isNextStepPlayer = false;
		if (previousStep) {
			isPreviousStepPlayer = typeof previousStep.time === 'number';
		}
		if (nextStep) {
			isNextStepPlayer = typeof nextStep.time === 'number';
		}
		if (!isPreviousStepPlayer && !isNextStepPlayer) {
			return true;
		}
		const timeDifferences = [];
		if (previousStep && isPreviousStepPlayer) {
			timeDifferences.push(step.end - previousStep.time);
		}
		if (nextStep && isNextStepPlayer) {
			timeDifferences.push(nextStep.time - step.end);
		}
		const minTimeDifference = Math.min(...timeDifferences);
		if (minTimeDifference < 300) {
			score = score + 1;
		}
		return true;
	});
	return score;
};

const getScore = (targetSteps, playerSteps) => {
	const allSteps = targetSteps.concat(playerSteps);
	sortStepsChronologically(allSteps);
	const directionSteps = getDirectionSteps(allSteps);
	const directionScores = directions.map((direction) => {
		return getDirectionScore(directionSteps[direction]);
	});
	return sum(directionScores);
};

export const updateScore = () => {
	return (dispatch, getState) => {
		const state = getState();
		dispatch({
			type: C.SCORE,
			value: getScore(state.targetSteps, state.playerSteps)
		});
	};
};
