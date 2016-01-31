import choregraphySubs from '../choregraphies/choreography_1.srt';
import { flattenArray } from './utils';

export const mapSubsToSteps = (subs) => {
	return flattenArray(subs.map((sub) => {
		return sub.directions.map((direction) => {
			return {
				direction,
				start: sub.startTime,
				end: sub.endTime
			};
		});
	}));
};

export const filterStepsByDirection = (steps, direction) => {
	return steps.filter((step) => {
		return (step.direction === direction);
	});
};

export const getStepsTimes = (steps) => {
	return steps.map((step) => {
		return step.end;
	});
};

export const getChoreography = () => {
	const steps = mapSubsToSteps(choregraphySubs);

	// const padSteps = {
	// 	left: filterStepsByDirection(steps, 'left'),
	// 	top: filterStepsByDirection(steps, 'top'),
	// 	right: filterStepsByDirection(steps, 'right'),
	// 	bottom: filterStepsByDirection(steps, 'bottom')
	// };
	// const padStepsTimes = {
	// 	left: getStepsTimes(padSteps.left),
	// 	top: getStepsTimes(padSteps.top),
	// 	right: getStepsTimes(padSteps.right),
	// 	bottom: getStepsTimes(padSteps.bottom)
	// };

	return steps;
};
