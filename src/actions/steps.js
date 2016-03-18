import C from '../constants';
import { dispatchToSlave } from '../threads/master';

export function dispatchStep(direction) {
	return (dispatch, getState) => {
		const state = getState();
		const time = Date.now() - state.choregraphy.get('time') - C.PAD_DELAY;
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
