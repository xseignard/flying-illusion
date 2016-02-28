import C from '../constants';
import { checkStatus } from './game';
import { dispatchStep } from './steps';
import dev from '../dev';

const onPadChange = (eventType, direction) => {
	return (dispatch, getState) => {
		const state = getState();
		const status = state.game.get('status');
		const upOrDown = eventType === 'keyup' ? 'up' : 'down';
		dispatch({
			type: C.PAD,
			direction,
			upOrDown
		});
		if (
			status !== 'intro' &&
			status !== 'tuto' &&
			status !== 'play'
		) {
			dispatch(checkStatus(direction));
		}
		else if (
			status === 'play' &&
			upOrDown === 'down'
		) {
			dispatch(dispatchStep(direction));
		}
	};
};
export function listenToPads() {
	return dispatch => {
		// TO BE REPLACED WITH MESSAGES COMING FROM THE ACTUAL PADS
		dev.listenToDirectionKeys((eventType, direction) => {
			dispatch(onPadChange(eventType, direction));
		});
		// listen to messages coming from electron main process
		if (window.electron) {
			window.electron.ipcRenderer.on('pad', (event, data) => {
				dispatch(onPadChange(data.eventType, data.direction));
			});
		}
	};
}
