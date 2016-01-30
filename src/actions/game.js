import C from '../constants';

export const checkGameStatus = (direction) => {
	return (dispatch, getState) => {
		if (!direction.match(/left|right/)) {
			return;
		}
		const state = getState();
		if (
			!state.game.timeout &&
			state.game.status === 'intro' &&
			state.pads.left === 'down' &&
			state.pads.right === 'down'
		) {
			const timeout = setTimeout(() => {
				dispatch({
					type: C.GAME_STATUS,
					status: 'selected',
					timeout: null
				});
			}, 2000);
			dispatch({
				type: C.GAME_STATUS,
				status: 'selecting',
				timeout
			});
		}
		else if (
			state.game.timeout &&
			state.game.status === 'selecting' && (
			state.pads.left === 'up' ||
			state.pads.right === 'up'
		)) {
			clearTimeout(state.game.timeout);
			dispatch({
				type: C.GAME_STATUS,
				status: 'intro',
				timeout: null
			});
		}
		else if (
			state.game.status === 'selected' &&
			state.pads.left === 'up' &&
			state.pads.right === 'up'
		) {
			setTimeout(() => {
				dispatch({
					type: C.GAME_STATUS,
					status: 'started'
				});
			}, 3000);
			dispatch({
				type: C.GAME_STATUS,
				status: 'starting'
			});
		}
	};
};

export const resetGame = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.GAME_STATUS,
			status: 'intro'
		});
		dispatch({
			type: C.STEPS_RESET
		});
	};
};
