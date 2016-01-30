import C from '../constants';
import { checkGameStatus } from './game';
import { listenToDirectionKeys } from '../misc/utils';

const onPadDown = (direction) => {
	return (dispatch, getState) => {
		dispatch({
			type: C.PAD,
			direction,
			upOrDown: 'down'
		});
		const state = getState();
		if (state.game.status === 'intro') {
			dispatch(checkGameStatus(direction));
		}
		else if (state.game.status === 'started') {
			dispatch({
				type: C.STEPS_ADD,
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
		if (state.game.status !== 'started') {
			dispatch(checkGameStatus(direction));
		}
		else if (state.game.status === 'started') {
			dispatch({
				type: C.STEPS_ADD,
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
