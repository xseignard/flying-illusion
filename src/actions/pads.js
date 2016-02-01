import C from '../constants';
import { checkGameStatus } from './game';
import { listenToDirectionKeys } from '../utils/direction-keys';
import { updateScore } from './score';

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
			const time = Date.now() - state.game.time;
			dispatch({
				type: C.PLAYER_STEP,
				direction,
				time
			});
			dispatch(updateScore());
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
