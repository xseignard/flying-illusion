import C from '../constants';
import { startTutoChoregraphy, startChoregraphy } from './choregraphy';
import { getMovesEndTime, stopMoves } from './moves';
import { setTutoStepsTimeouts, resetSteps } from './steps';

let launchIntro;
let launchTuto;
let launchWait;
let launchLoad;
let launchPlay;
let launchRank;
let checkStatus;

launchIntro = () => {
	return (dispatch, getState) => {
		const introTimeout = setTimeout(() => {
			dispatch(launchTuto());
		}, C.GAME_INTRO_DURATION);
		dispatch({
			type: C.GAME_INTRO,
			timeout: introTimeout
		});
	};
};

launchTuto = () => {
	return (dispatch, getState) => {
		dispatch(resetSteps());
		dispatch(startTutoChoregraphy());
		dispatch(setTutoStepsTimeouts());
		const tutoFinishTime = getMovesEndTime(getState().moves)
			- C.TUTO_FORWARD_TIME
			- C.MOVE_DURATION
			+ C.GAME_END_DELAY;
		const tutoTimeout = setTimeout(() => {
			dispatch(resetSteps());
			dispatch(stopMoves());
			dispatch(launchWait());
			dispatch(checkStatus());
		}, tutoFinishTime);
		dispatch({
			type: C.GAME_TUTO,
			time: Date.now() - C.TUTO_FORWARD_TIME,
			timeout: tutoTimeout
		});
	};
};

launchWait = () => {
	return (dispatch, getState) => {
		const state = getState();
		clearTimeout(state.game.get('timeout'));
		const waitTimeout = setTimeout(() => {
			dispatch({
				type: C.GAME_IDLE
			});
		}, C.GAME_WAIT_DURATION);
		dispatch({
			type: C.GAME_WAIT,
			timeout: waitTimeout
		});
	};
};

launchLoad = () => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const loadTimeout = setTimeout(() => {
			dispatch(launchPlay());
		}, C.GAME_LOAD_DURATION);
		dispatch({
			type: C.GAME_LOAD,
			timeout: loadTimeout
		});
	};
};

launchPlay = () => {
	return (dispatch, getState) => {
		dispatch(resetSteps());
		dispatch(startChoregraphy());
		const playEndTime = getMovesEndTime(getState().moves) + C.GAME_END_DELAY;
		const playTimeout = setTimeout(() => {
			dispatch({
				type: C.GAME_SAVE
			});
		}, playEndTime);
		dispatch({
			type: C.GAME_PLAY,
			time: Date.now(),
			timeout: playTimeout
		});
	};
};

launchRank = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.GAME_RANK
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

checkStatus = (direction) => {
	return (dispatch, getState) => {
		const state = getState();
		const status = state.game.get('status');
		const pads = state.pads;
		if (
			status === 'idle' &&
			pads.includes('down')
		) {
			dispatch(launchIntro());
		}
		else if (direction && direction.match(isTopOrBottom)) {
			return;
		}
		else if (
			status === 'wait' &&
			areLeftAndRightDown(pads)
		) {
			dispatch(launchLoad());
		}
		else if (
			status === 'load' &&
			isLeftOrRightUp(pads)
		) {
			dispatch(launchWait());
		}
	};
};

export {
	launchPlay,
	launchRank,
	checkStatus
};
