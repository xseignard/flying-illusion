import C from '../constants';
import { startChoreography, stopChoreography } from './choreography';
import { updateScore } from './score';

export const startGame = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.RESET_PLAYER_STEPS
		});
		dispatch({
			type: C.RESET_TARGET_STEPS
		});
		dispatch(updateScore());
		dispatch({
			type: C.GAME,
			status: 'started',
			time: Date.now()
		});
		dispatch(startChoreography());
	};
};

export const stopGame = () => {
	return (dispatch, getState) => {
		dispatch(stopChoreography());
		dispatch({
			type: C.GAME,
			status: 'idle'
		});
		dispatch({
			type: C.RESET_PLAYER_STEPS
		});
		dispatch({
			type: C.RESET_TARGET_STEPS
		});
		dispatch(updateScore());
	};
};

export const checkGameStatus = (direction) => {
	return (dispatch, getState) => {
		const state = getState();
		if (
			!state.game.timeout &&
			state.game.status === 'idle'
		) {
			dispatch({
				type: C.GAME,
				status: 'intro',
				timeout: setTimeout(() => {
					dispatch({
						type: C.GAME,
						status: 'waiting',
						timeout: setTimeout(() => {
							dispatch({
								type: C.GAME,
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
				type: C.GAME,
				status: 'loading',
				timeout: setTimeout(() => {
					dispatch(startGame());
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
				type: C.GAME,
				status: 'waiting',
				timeout: setTimeout(() => {
					dispatch({
						type: C.GAME,
						status: 'idle'
					});
				}, 5000)
			});
		}
	};
};
