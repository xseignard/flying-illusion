import C from '../constants';
import { checkStatus } from './game';
import { dispatchStep } from './steps';

export const onPadChange = (eventType, direction) => {
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
