import C from '../constants';
import { checkGameStatus } from './game';
import { listenToDirectionKeys } from '../utils/direction-keys';
import { dispatchStep } from './steps';

const onPadChange = (eventType, direction) => {
	return (dispatch, getState) => {
		const state = getState();
		const status = state.game.status;
		const upOrDown = eventType === 'keyup' ? 'up' : 'down';
		dispatch({
			type: C.PAD,
			direction,
			upOrDown
		});
		if (status !== 'started') {
			dispatch(checkGameStatus(direction));
		}
		else if (upOrDown === 'down') {
			dispatch(dispatchStep(direction));
		}
	};
};
export function listenToPads() {
	return dispatch => {
		// TO BE REPLACED WITH MESSAGES COMING FROM THE ACTUAL PADS
		listenToDirectionKeys((eventType, direction) => {
			dispatch(onPadChange(eventType, direction));
		});
	};
}
