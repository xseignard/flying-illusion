/* Runs in slave thread */

import C from '../constants';

export function setTutoStepsTimeouts() {
	return (dispatch, getState) => {
		const timeDifference = Date.now() - getState().choregraphy.get('time');
		C.TUTO_STEPS.forEach((tutoStep) => {
			setTimeout(() => {
				dispatch({
					type: C.STEP,
					direction: tutoStep.direction,
					time: tutoStep.time,
					log: true
				});
			}, tutoStep.time - timeDifference);
		});
	};
}
