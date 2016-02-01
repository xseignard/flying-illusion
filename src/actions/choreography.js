import C from '../constants';
import { updateScore } from './score';
import { getChoreographySteps } from '../utils/choreography';

const ADDITIONAL_TIME = 500;
let timeouts;
let choregraphyEndTimeout;

export const startChoreography = () => {
	return (dispatch, getState) => {
		const steps = getChoreographySteps();
		timeouts = steps.map((step) => {
			const visualTimeout = setTimeout(() => {
				dispatch({
					type: C.TARGET_STEP,
					direction: step.direction,
					start: step.start,
					end: step.end
				});
			}, step.start);
			const scoreTimeout = setTimeout(() => {
				dispatch(updateScore());
			}, step.end + ADDITIONAL_TIME);
			return {
				visualTimeout,
				scoreTimeout
			};
		});
		const gameEndTime = parseInt(steps[steps.length - 1].end, 10) + 1000;
		choregraphyEndTimeout = setTimeout(() => {
			dispatch({
				type: C.GAME,
				status: 'end'
			});
		}, gameEndTime);
	};
};

export const stopChoreography = (choreography) => {
	return (dispatch, getState) => {
		timeouts.forEach((timeout) => {
			clearTimeout(timeout.visualTimeout);
			clearTimeout(timeout.scoreTimeout);
			clearTimeout(choregraphyEndTimeout);
		});
		timeouts = [];
	};
};
