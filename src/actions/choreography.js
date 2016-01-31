import C from '../constants';
import { updateScore } from './score';
import { getChoreography } from '../utils/choreography';

const ADDITIONAL_TIME = 500;
let timeouts;

export const startChoreography = () => {
	return (dispatch, getState) => {
		const steps = getChoreography();
		timeouts = steps.map((step) => {
			const visualTimeout = setTimeout(() => {
				dispatch({
					type: C.TARGET_STEP,
					direction: step.direction,
					time: step.end
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
	};
};

export const stopChoreography = (choreography) => {
	return (dispatch, getState) => {
		timeouts.forEach((timeout) => {
			clearTimeout(timeout.visualTimeout);
			clearTimeout(timeout.scoreTimeout);
		});
		timeouts = [];
	};
};
