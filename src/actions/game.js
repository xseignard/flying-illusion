import C from '../constants';
import { startArrows, stopArrows } from './arrows';
import { setChoregraphy } from './choregraphy';

export const startGame = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.STEPS_RESET
		});
		dispatch(setChoregraphy());
		dispatch({
			type: C.GAME,
			status: 'started',
			time: Date.now()
		});
		dispatch(startArrows());
	};
};

export const stopGame = () => {
	return (dispatch, getState) => {
		dispatch(stopArrows());
		dispatch({
			type: C.GAME,
			status: 'idle'
		});
		dispatch({
			type: C.STEPS_RESET
		});
		dispatch({
			type: C.CHOREGRAPHY_RESET
		});
	};
};

let setGameWaiting;
let checkGameStatus;

const setGameIntro = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.GAME,
			status: 'intro'
		});
		dispatch({
			type: C.GAME_TIMEOUT,
			timeout: setTimeout(() => {
				dispatch(setGameWaiting());
				dispatch(checkGameStatus());
			}, 5000)
		});
	};
};

setGameWaiting = () => {
	return (dispatch, getState) => {
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
	};
};

const setGameLoading = () => {
	return (dispatch, getState) => {
		const state = getState();
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
	};
};

checkGameStatus = (direction) => {
	return (dispatch, getState) => {
		const state = getState();
		if (
			state.game.status === 'idle' && (
				state.pads.left === 'down' ||
				state.pads.top === 'down' ||
				state.pads.bottom === 'down' ||
				state.pads.right === 'down'
			)
		) {
			dispatch(setGameIntro());
		}
		else if (direction && direction.match(/top|bottom/)) {
			return;
		}
		else if (
			state.game.status === 'waiting' &&
			state.pads.left === 'down' &&
			state.pads.right === 'down'
		) {
			dispatch(setGameLoading());
		}
		else if (
			state.game.status === 'loading' && (
			state.pads.left === 'up' ||
			state.pads.right === 'up'
		)) {
			dispatch(setGameWaiting());
		}
	};
};

export { checkGameStatus };
