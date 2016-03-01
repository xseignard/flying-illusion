import C from '../constants';
import { dispatchToSlave } from '../utils/master';

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
