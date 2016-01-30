import C from '../constants';
import { checkGamePending, clearPendingTimeout, checkGameStarted } from './game';
import { listenToDirectionKeys } from '../misc/utils';

const onPadDown = (direction) => {
	return (dispatch, getState) => {
		dispatch({
			type: C.PAD,
			direction,
			upOrDown: 'down'
		});
		const state = getState();
		if (state.game === 'intro') {
			if (direction.match(/left|right/)) {
				dispatch(checkGamePending());
			}
		}
		else if (state.game === 'started') {
			dispatch({
				type: C.STEP,
				direction,
				upOrDown: 'down',
				time: Date.now()
			});
		}
	};
};

const onPadUp = (direction) => {
	return (dispatch, getState) => {
		dispatch({
			type: C.PAD,
			direction,
			upOrDown: 'up'
		});
		const state = getState();
		if (state.game === 'intro') {
			if (direction.match(/left|right/)) {
				clearPendingTimeout();
			}
		}
		else if (state.game === 'pending') {
			if (direction.match(/left|right/)) {
				dispatch(checkGameStarted());
			}
		}
		else if (state.game === 'started') {
			dispatch({
				type: C.STEP,
				direction,
				upOrDown: 'up',
				time: Date.now()
			});
		}
	};
};

export function listenToPads() {
	return dispatch => {
		// TO BE REPLACED WITH MESSAGES COMING FROM THE ACTUAL PADS
		listenToDirectionKeys((eventType, direction) => {
			if (eventType === 'keyup') {
				dispatch(onPadUp(direction));
			}
			else if (eventType === 'keydown') {
				dispatch(onPadDown(direction));
			}
		});
	};
}
