import C from '../constants';
import { dispatchToSlave } from '../master';

export function dispatchStep(direction) {
	return (dispatch, getState) => {
		const state = getState();
		const time = Date.now() - state.choregraphy.get('time');
		dispatchToSlave({
			type: C.STEP,
			direction,
			time,
			log: true
		});
	};
}

export function resetSteps() {
	return (dispatch, getState) => {
		dispatch({
			type: C.STEPS_RESET
		});
	};
}

export function setTutoStepsTimeouts() {
	return (dispatch, getState) => {
		C.TUTO_STEPS.forEach((tutoStep) => {
			setTimeout(() => {
				dispatch(dispatchStep(tutoStep.direction));
			}, tutoStep.time - C.TUTO_FORWARD_TIME);
		});
	};
}
