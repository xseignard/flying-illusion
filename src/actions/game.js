import C from '../constants';

let pendingTimeout = null;

export const checkGamePending = () => {
	return (dispatch, getState) => {
		const state = getState();
		if (
			state.game === 'intro' &&
			state.pads.left === 'down' &&
			state.pads.right === 'down'
		) {
			pendingTimeout = setTimeout(() => {
				dispatch({
					type: C.GAME,
					status: 'pending'
				});
			}, 2000);
		}
	};
};

export const clearPendingTimeout = () => {
	if (pendingTimeout) {
		clearTimeout(pendingTimeout);
	}
};

export const checkGameStarted = () => {
	return (dispatch, getState) => {
		const state = getState();
		if (
			state.game === 'pending' &&
			state.pads.left === 'up' &&
			state.pads.right === 'up'
		) {
			dispatch({
				type: C.GAME,
				status: 'started'
			});
		}
	};
};

export const resetGame = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.GAME,
			status: 'intro'
		});
	};
};
