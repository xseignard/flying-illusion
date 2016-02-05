import C from '../constants';

export function dispatchStep(direction) {
	return (dispatch, getState) => {
		const state = getState();
		const time = Date.now() - state.game.get('time');
		dispatch({
			type: C.STEP,
			direction,
			time
		});
	};
}
