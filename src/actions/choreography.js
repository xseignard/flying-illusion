import choregraphy from '../choregraphies/choreography_1.srt';
import { flattenArray } from '../misc/utils';

const timeouts = [];

export const mapSubsToSteps = (subs) => {
	console.log(subs);
	return flattenArray(subs.map((sub) => {
		return sub.directions.map((direction) => {
			return {
				direction,
				start: sub.startTime,
				duration: sub.endTime - sub.startTime
			};
		});
	}));
};

export const startChoreography = () => {
	console.log(mapSubsToSteps(choregraphy));
	// const createTimeouts = (step) => {
	// 	const startTimeout = setTimeout(() => {
	// 		console.log('START');
	// 	}, step.startTime);
	// 	timeouts.push(startTimeout);
	//
	// 	const endTimeout = setTimeout(() => {
	// 		console.log('END');
	// 	}, step.endTime);
	// 	timeouts.push(endTimeout);
	// };
	//
	// const choregraphySteps = steps.map((step) => {
	// 	return [
	// 		{
	// 			direction: step.direction
	// 			upOrDown: 'down',
	// 			time: step.startTime,
	// 		}
	// 	]
	//
	// })
	//
	// steps.forEach(createTimeouts);
	console.log('done');
};

export const stopChoreography = (choreography) => {
	timeouts.forEach((timeout) => {
		clearTimeout(timeout);
	});
	// TODO: dispatch stopped action?
};
