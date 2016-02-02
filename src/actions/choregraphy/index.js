import C from '../../constants';
import { updateScore } from '../score';
import { getChoregraphySteps } from './helpers';

export const startChoregraphy = () => {
	return (dispatch, getState) => {
		const steps = getChoregraphySteps();
		const choregraphyStepsTimeouts = steps.map((step) => {
			const visualTimeout = setTimeout(() => {
				dispatch({
					type: C.CHOREGRAPHY_STEP,
					direction: step.direction,
					start: step.start,
					end: step.end
				});
			}, step.start);
			const scoreTimeout = setTimeout(() => {
				dispatch(updateScore());
			}, step.end + C.ADDITIONAL_TIME);
			return {
				visualTimeout,
				scoreTimeout
			};
		});
		dispatch({
			type: C.CHOREGRAPHY_STEPS_TIMEOUTS,
			timeouts: choregraphyStepsTimeouts
		});
		const gameEndTime = parseInt(steps[steps.length - 1].end, 10) + 1000;
		dispatch({
			type: C.CHOREGRAPHY_END_TIMEOUT,
			timeout: setTimeout(() => {
				dispatch({
					type: C.GAME,
					status: 'end'
				});
			}, gameEndTime)
		});
	};
};

export const stopChoregraphy = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.timeouts.choregraphySteps.forEach((timeout) => {
			clearTimeout(timeout.visualTimeout);
			clearTimeout(timeout.scoreTimeout);
		});
		clearTimeout(state.timeouts.choregraphyEnd);
	};
};
