import C from '../constants';
import {
	startTutoChoregraphy,
	startChoregraphy,
	stopChoregraphy,
	getChoregraphyEndTime
} from './choregraphy';
import { setTutoStepsTimeouts, resetSteps } from './steps';

let launchGameTuto;
let launchGameWait;
let checkGameStatus;

export const startGame = () => {
	return (dispatch, getState) => {
		dispatch(startChoregraphy());
		dispatch(resetSteps());
		const gameEndTime = getChoregraphyEndTime(getState().choregraphy) + C.GAME_END_DELAY;
		const gameEndTimeout = setTimeout(() => {
			dispatch({
				type: C.GAME_END
			});
		}, gameEndTime);
		dispatch({
			type: C.GAME_PLAY,
			time: Date.now(),
			timeout: gameEndTimeout
		});
	};
};

const stopGame = () => {
	return (dispatch, getState) => {
		dispatch(stopChoregraphy());
		const state = getState();
		clearTimeout(state.game.get('timeout'));
	};
};

const launchGameIntro = () => {
	return (dispatch, getState) => {
		const gameIntroTimeout = setTimeout(() => {
			dispatch(launchGameTuto());
		}, C.GAME_INTRO_DURATION);
		dispatch({
			type: C.GAME_INTRO,
			timeout: gameIntroTimeout
		});
	};
};

launchGameTuto = () => {
	return (dispatch, getState) => {
		dispatch(startTutoChoregraphy());
		dispatch(resetSteps());
		dispatch(setTutoStepsTimeouts());
		const gameFinishTime = getChoregraphyEndTime(getState().choregraphy)
			- C.TUTO_START_TIME
			- C.MOVE_DURATION
			+ C.GAME_END_DELAY;
		const gameTutoTimeout = setTimeout(() => {
			dispatch(stopGame());
			dispatch(launchGameWait());
			dispatch(checkGameStatus());
		}, gameFinishTime);
		dispatch({
			type: C.GAME_TUTO,
			time: Date.now() - C.TUTO_START_TIME,
			timeout: gameTutoTimeout
		});
	};
};

launchGameWait = () => {
	return (dispatch, getState) => {
		const state = getState();
		clearTimeout(state.game.get('timeout'));
		const gameWaitTimeout = setTimeout(() => {
			dispatch({
				type: C.GAME_IDLE
			});
		}, C.GAME_WAIT_DURATION);
		dispatch({
			type: C.GAME_WAIT,
			timeout: gameWaitTimeout
		});
	};
};


const launchGameLoad = () => {
	return (dispatch, getState) => {
		const state = getState();
		clearTimeout(state.game.get('timeout'));
		const gameLoadTimeout = setTimeout(() => {
			dispatch(startGame());
		}, C.GAME_LOAD_DURATION);
		dispatch({
			type: C.GAME_LOAD,
			timeout: gameLoadTimeout
		});
	};
};

const leftAndRight = ['left', 'right'];

const areLeftAndRightDown = (pads) => {
	return leftAndRight.every((dir) => {
		return pads.get(dir) === 'down';
	});
};
const isLeftOrRightUp = (pads) => {
	return leftAndRight.some((dir) => {
		return pads.get(dir) === 'up';
	});
};

const isTopOrBottom = /top|bottom/;

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
			areLeftAndRightDown(pads)
		) {
			dispatch(launchGameLoad());
		}
		else if (
			status === 'load' &&
			isLeftOrRightUp(pads)
		) {
			dispatch(launchGameWait());
		}
	};
};

export { checkGameStatus };
