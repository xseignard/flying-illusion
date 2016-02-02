import C from '../constants';
import { updateScore } from './score';

export function dispatchStep(direction) {
	return (dispatch, getState) => {
		const state = getState();
		const time = Date.now() - state.game.time;
		dispatch({
			type: C.STEP,
			direction,
			time
		});
		dispatch(updateScore());
	};
}
