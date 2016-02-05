import C from '../constants';
import { startChoregraphy, stopChoregraphy, getChoregraphyEndTime } from './choregraphy';

export const startGame = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.STEPS_RESET
		});
		dispatch({
			type: C.GAME_PLAY,
			time: Date.now()
		});
		dispatch(startChoregraphy());
		const gameEndTime = getChoregraphyEndTime(getState().choregraphy) + C.GAME_END_DELAY;
		dispatch({
			type: C.GAME_TIMEOUT,
			timeout: setTimeout(() => {
				dispatch({
					type: C.GAME_END
				});
			}, gameEndTime)
		});
	};
};

export const stopGame = () => {
	return (dispatch, getState) => {
		dispatch(stopChoregraphy());
		const state = getState();
		clearTimeout(state.game.get('timeout'));
		dispatch({
			type: C.GAME_IDLE
		});
		dispatch({
			type: C.STEPS_RESET
		});
	};
};

let launchGameWait;
let checkGameStatus;

const launchGameIntro = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.GAME_INTRO
		});
		dispatch({
			type: C.GAME_TIMEOUT,
			timeout: setTimeout(() => {
				dispatch(launchGameWait());
				dispatch(checkGameStatus());
			}, 5000)
		});
	};
};

launchGameWait = () => {
	return (dispatch, getState) => {
		const state = getState();
		clearTimeout(state.game.get('timeout'));
		dispatch({
			type: C.GAME_WAIT
		});
		dispatch({
			type: C.GAME_TIMEOUT,
			timeout: setTimeout(() => {
				dispatch({
					type: C.GAME_IDLE
				});
			}, 10000)
		});
	};
};

const launchGameLoad = () => {
	return (dispatch, getState) => {
		const state = getState();
		clearTimeout(state.game.get('timeout'));
		dispatch({
			type: C.GAME_LOAD
		});
		dispatch({
			type: C.GAME_TIMEOUT,
			timeout: setTimeout(() => {
				dispatch(startGame());
			}, 3000)
		});
	};
};

const isTopOrBottom = /top|bottom/;
const areLeftAndRightPadDown = (pads) => {
	return ['left', 'right'].every((dir) => {
		return pads.get(dir) === 'down';
	});
};
const isLeftOrRightPadUp = (pads) => {
	return ['left', 'right'].some((dir) => {
		return pads.get(dir) === 'up';
	});
};

checkGameStatus = (direction) => {
	return (dispatch, getState) => {
		const state = getState();
		const status = state.game.get('status');
		const pads = state.pads;
		if (
			status === 'idle' &&
			pads.includes('down')
		) {
			dispatch(launchGameIntro());
		}
		else if (direction && direction.match(isTopOrBottom)) {
			return;
		}
		else if (
			status === 'wait' &&
			areLeftAndRightPadDown(pads)
		) {
			dispatch(launchGameLoad());
		}
		else if (
			status === 'load' &&
			isLeftOrRightPadUp(pads)
		) {
			dispatch(launchGameWait());
		}
	};
};

export { checkGameStatus };
