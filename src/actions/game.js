import C from '../constants';
import { startTutoChoregraphy, startChoregraphy, resetChoregraphy } from './choregraphy';
import { getMovesEndTime, stopMoves } from './moves';
import { setTutoStepsTimeouts, resetSteps } from './steps';

let launchIdle;
let launchIntro;
let launchTuto;
let launchWait;
let launchWarning;
let launchLoad;
let launchPlay;
let launchRecap;
let launchSave;
let launchRank;
let launchEnd;
let checkStatus;

launchIdle = () => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		dispatch({
			type: C.GAME_IDLE,
		});
	};
};

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
		const tutoFinishTime = getMovesEndTime(getState().dance.get('moves'))
			- C.TUTO_FORWARD_TIME
			- C.MOVE_DURATION;
		const tutoTimeout = setTimeout(() => {
			dispatch(resetSteps());
			dispatch(stopMoves());
			dispatch(resetChoregraphy());
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

launchWarning = () => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const warningTimeout = setTimeout(() => {
			dispatch(launchLoad());
		}, C.GAME_WARNING_DURATION);
		dispatch({
			type: C.GAME_WARNING,
			timeout: warningTimeout
		});
	};
};

launchLoad = () => {
	return (dispatch, getState) => {
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
		const playEndTime = getMovesEndTime(getState().dance.get('moves'));
		const playTimeout = setTimeout(() => {
			dispatch(launchRecap());
		}, playEndTime);
		dispatch({
			type: C.GAME_PLAY,
			time: Date.now(),
			timeout: playTimeout
		});
	};
};

launchRecap = () => {
	return (dispatch, getState) => {
		const recapTimeout = setTimeout(() => {
			dispatch(launchSave());
		}, C.GAME_RECAP_DURATION);
		dispatch({
			type: C.GAME_RECAP,
			timeout: recapTimeout
		});
	};
};

launchSave = () => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const saveTimeout = setTimeout(() => {
			dispatch(launchIdle());
		}, C.GAME_SAVE_DURATION);
		dispatch({
			type: C.GAME_SAVE,
			timeout: saveTimeout
		});
	};
};

launchRank = () => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const rankTimeout = setTimeout(() => {
			dispatch(launchEnd());
		}, C.GAME_RANK_DURATION);
		dispatch({
			type: C.GAME_RANK,
			timeout: rankTimeout
		});
	};
};

launchEnd = () => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const endTimeout = setTimeout(() => {
			dispatch(launchIdle());
		}, C.GAME_END_DURATION);
		dispatch({
			type: C.GAME_END,
			timeout: endTimeout
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

const isLeftOrRight = /left|right/;

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
		else if (
			direction &&
			!direction.match(isLeftOrRight)
		) {
			return;
		}
		if (
			status === 'wait' &&
			areLeftAndRightDown(pads)
		) {
			dispatch(launchWarning());
			return;
		}
		if (
			(
				status === 'warning' ||
				status === 'load'
			) &&
			isLeftOrRightUp(pads)
		) {
			dispatch(launchWait());
			return;
		}
		if (
			direction !== 'right' ||
			pads.get('right') !== 'down'
		) {
			return;
		}
		if (status === 'recap') {
			dispatch(launchSave());
		}
		if (status === 'save') {
			dispatch(launchSave());
		}
		if (status === 'rank') {
			dispatch(launchEnd());
		}
		if (status === 'end') {
			dispatch(launchIdle());
		}
	};
};

export {
	launchPlay,
	launchRank,
	launchRecap,
	checkStatus
};
