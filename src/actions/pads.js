import C from '../constants';
import { checkGameStatus } from './game';
import { listenToDirectionKeys } from '../misc/direction-keys';

const onPadChange = (eventType, direction) => {
	return (dispatch, getState) => {
		const status = getState().game.status;
		const upOrDown = eventType === 'keyup' ? 'up' : 'down';
		dispatch({
			type: C.PAD,
			direction,
			upOrDown
		});
		if (status === 'started') {
			dispatch({
				type: C.STEPS_ADD,
				direction,
				upOrDown,
				time: Date.now()
			});
		}
		else {
			dispatch(checkGameStatus(direction));
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
