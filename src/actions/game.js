import C from '../constants';
import { startChoregraphy, stopChoregraphy } from './choregraphy';
import { updateScore } from './score';

export const startGame = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.RESET_PLAYER_STEPS
		});
		dispatch({
			type: C.RESET_CHOREGRAPHY_STEPS
		});
		dispatch(updateScore());
		dispatch({
			type: C.GAME,
			status: 'started',
			time: Date.now()
		});
		dispatch(startChoregraphy());
	};
};

export const stopGame = () => {
	return (dispatch, getState) => {
		dispatch(stopChoregraphy());
		dispatch({
			type: C.GAME,
			status: 'idle'
		});
		dispatch({
			type: C.RESET_PLAYER_STEPS
		});
		dispatch({
			type: C.RESET_CHOREGRAPHY_STEPS
		});
		dispatch(updateScore());
	};
};

export const checkGameStatus = (direction) => {
	return (dispatch, getState) => {
		const state = getState();
		if (
			!state.timeouts.game &&
			state.game.status === 'idle'
		) {
			dispatch({
				type: C.GAME,
				status: 'intro'
			});
			dispatch({
				type: C.GAME_TIMEOUT,
				timeout: setTimeout(() => {
					dispatch({
						type: C.GAME,
						status: 'waiting'
					});
					dispatch({
						type: C.GAME_TIMEOUT,
						timeout: setTimeout(() => {
							dispatch({
								type: C.GAME,
								status: 'idle'
							});
						}, 10000)
					});
				}, 5000)
			});
		}
		else if (direction && direction.match(/top|bottom/)) {
			return;
		}
		else if (
			state.timeouts.game &&
			state.game.status === 'waiting' &&
			state.pads.left === 'down' &&
			state.pads.right === 'down'
		) {
			clearTimeout(state.timeouts.game);
			dispatch({
				type: C.GAME,
				status: 'loading'
			});
			dispatch({
				type: C.GAME_TIMEOUT,
				timeout: setTimeout(() => {
					dispatch(startGame());
				}, 3000)
			});
		}
		else if (
			state.timeouts.game &&
			state.game.status === 'loading' && (
			state.pads.left === 'up' ||
			state.pads.right === 'up'
		)) {
			clearTimeout(state.timeouts.game);
			dispatch({
				type: C.GAME,
				status: 'waiting'
			});
			dispatch({
				type: C.GAME_TIMEOUT,
				timeout: setTimeout(() => {
					dispatch({
						type: C.GAME,
						status: 'idle'
					});
				}, 10000)
			});
		}
	};
};
