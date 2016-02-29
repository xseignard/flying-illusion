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
		setTimeout(() => {
			dispatch(dispatchStep(C.TUTO_STEP_ONE_DIRECTION));
		}, C.TUTO_STEP_ONE_TIME - C.TUTO_FORWARD_TIME);
		setTimeout(() => {
			dispatch(dispatchStep(C.TUTO_STEP_TWO_DIRECTION));
		}, C.TUTO_STEP_TWO_TIME - C.TUTO_FORWARD_TIME);
	};
}
