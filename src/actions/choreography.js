import moment from 'moment';
import choregraphy from '../choregraphies/choreography_1.srt';
import { flattenArray } from '../misc/utils';

const timeouts = [];

export const mapSubsToSteps = (subs) => {
	console.log(subs);
	const mappedSubs = subs.map((sub) => {
		const start = moment.duration(sub.startTime).asMilliseconds();
		const duration = moment.duration(sub.endTime).asMilliseconds() - start;
		const result = [];
		sub.text.split('#').forEach((direction) => {
			result.push({ direction, start, duration });
		});
		return result;
	});
	return flattenArray(mappedSubs);
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
	timeouts.forEach(clearTimeout);
	// TODO: dispatch stopped action?
};
