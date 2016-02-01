import moment from 'moment';
import choregraphySubs from '../choregraphies/choreography_1.srt';
import { flattenArray } from './utils';

export const mapSubsToSteps = (subs) => {
	const mappedSubs = subs.map((sub) => {
		const start = moment.duration(sub.startTime).asMilliseconds();
		const end = moment.duration(sub.endTime).asMilliseconds();
		const formattedSteps = sub.text.split('#').map((direction) => {
			return { direction, start, end };
		});
		return formattedSteps;
	});
	return flattenArray(mappedSubs);
};

export const filterStepsByDirection = (steps, direction) => {
	return steps.filter((step) => {
		return (step.direction === direction);
	});
};

export const getChoreographySteps = () => {
	const steps = mapSubsToSteps(choregraphySubs);
	return steps;
};
