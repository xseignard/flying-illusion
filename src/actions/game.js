import C from '../constants';
import { stopChoreography } from './choreography';

export const checkGameStatus = (direction) => {
	return (dispatch, getState) => {
		const state = getState();
		if (
			!state.game.timeout &&
			state.game.status === 'idle'
		) {
			dispatch({
				type: C.GAME_STATUS,
				status: 'intro',
				timeout: setTimeout(() => {
					dispatch({
						type: C.GAME_STATUS,
						status: 'waiting',
						timeout: setTimeout(() => {
							dispatch({
								type: C.GAME_STATUS,
								status: 'idle'
							});
						}, 5000)
					});
					dispatch(checkGameStatus());
				}, 5000)
			});
		}
		else if (direction && direction.match(/top|bottom/)) {
			return;
		}
		else if (
			state.game.timeout &&
			state.game.status === 'waiting' &&
			state.pads.left === 'down' &&
			state.pads.right === 'down'
		) {
			clearTimeout(state.game.timeout);
			dispatch({
				type: C.GAME_STATUS,
				status: 'loading',
				timeout: setTimeout(() => {
					dispatch({
						type: C.GAME_STATUS,
						status: 'started'
					});
				}, 3000)
			});
		}
		else if (
			state.game.timeout &&
			state.game.status === 'loading' && (
			state.pads.left === 'up' ||
			state.pads.right === 'up'
		)) {
			clearTimeout(state.game.timeout);
			dispatch({
				type: C.GAME_STATUS,
				status: 'waiting',
				timeout: setTimeout(() => {
					dispatch({
						type: C.GAME_STATUS,
						status: 'idle',
						time: Date.now()
					});
				}, 5000)
			});
		}
	};
};

export const resetGame = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.GAME_STATUS,
			status: 'idle'
		});
		dispatch({
			type: C.RESET_PLAYER_STEPS
		});
		dispatch({
			type: C.RESET_TARGET_STEPS
		});
		dispatch(stopChoreography());
	};
};
