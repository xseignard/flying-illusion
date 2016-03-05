import C from '../constants';
import {
	getChoregraphyEndTime,
	setTutoChoregraphy,
	setRandomChoregraphy,
	setGameTimeouts,
	resetChoregraphy
} from './choregraphy';
import { sendToSlave } from '../utils/master';
import { resetSteps } from './steps';

let launchAssets;
let launchIdle;
let launchZoom;
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

launchAssets = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const assetsTimeout = setTimeout(() => {
			dispatch(launchIdle());
		}, C.GAME_ASSETS_DURATION + devTime);
		dispatch({
			type: C.GAME_ASSETS,
			timeout: assetsTimeout
		});
	};
};

launchIdle = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const idleTimeout = setTimeout(() => {
			dispatch(launchZoom());
		}, C.GAME_IDLE_DURATION + devTime);
		dispatch({
			type: C.GAME_IDLE,
			timeout: idleTimeout
		});
	};
};

launchZoom = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const zoomTimeout = setTimeout(() => {
			dispatch(launchIdle());
		}, C.GAME_ZOOM_DURATION + devTime);
		dispatch({
			type: C.GAME_ZOOM,
			timeout: zoomTimeout
		});
	};
};

launchIntro = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const introTimeout = setTimeout(() => {
			dispatch(launchTuto());
		}, C.GAME_INTRO_DURATION + devTime);
		dispatch({
			type: C.GAME_INTRO,
			timeout: introTimeout
		});
	};
};

launchTuto = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		dispatch({ type: C.STATS_RESET });
		dispatch(resetSteps());
		dispatch(setTutoChoregraphy());
		const tutoFinishTime = getChoregraphyEndTime(getState().dance.get('moves'))
			+ C.TUTO_END_DELAY
			- C.TUTO_FORWARD_TIME
			- C.MOVE_DURATION;
		const tutoTimeout = setTimeout(() => {
			dispatch(launchWait());
			dispatch(checkStatus());
		}, tutoFinishTime + devTime);
		dispatch({
			type: C.GAME_TUTO,
			timeout: tutoTimeout
		});
		dispatch(setGameTimeouts(true));
	};
};

launchWait = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const waitTimeout = setTimeout(() => {
			dispatch({
				type: C.GAME_IDLE
			});
		}, C.GAME_WAIT_DURATION + devTime);
		dispatch({
			type: C.GAME_WAIT,
			timeout: waitTimeout
		});
	};
};

launchWarning = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const warningTimeout = setTimeout(() => {
			dispatch(launchLoad());
		}, C.GAME_WARNING_DURATION + devTime);
		dispatch({
			type: C.GAME_WARNING,
			timeout: warningTimeout
		});
	};
};

launchLoad = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const loadTimeout = setTimeout(() => {
			dispatch(launchPlay());
		}, C.GAME_LOAD_DURATION + devTime);
		dispatch({
			type: C.GAME_LOAD,
			timeout: loadTimeout
		});
	};
};

launchPlay = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		dispatch({ type: C.STATS_RESET });
		dispatch(resetSteps());
		dispatch(setRandomChoregraphy());
		const playEndTime = getChoregraphyEndTime(getState().dance.get('moves')) + C.MOVES_END_DELAY;
		const playTimeout = setTimeout(() => {
			dispatch(resetSteps());
			dispatch(launchRecap());
		}, playEndTime + devTime);
		dispatch({
			type: C.GAME_PLAY,
			timeout: playTimeout
		});
		dispatch(setGameTimeouts());
	};
};

launchRecap = (devTime = 0) => {
	return (dispatch, getState) => {
		sendToSlave({ function: 'stopMoves' });
		clearTimeout(getState().game.get('timeout'));
		const recapTimeout = setTimeout(() => {
			dispatch(launchSave());
		}, C.GAME_RECAP_DURATION + devTime);
		dispatch({
			type: C.GAME_RECAP,
			timeout: recapTimeout
		});
	};
};

launchSave = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const saveTimeout = setTimeout(() => {
			dispatch(launchIdle());
		}, C.GAME_SAVE_DURATION + devTime);
		dispatch({
			type: C.GAME_SAVE,
			timeout: saveTimeout
		});
	};
};

launchRank = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const rankTimeout = setTimeout(() => {
			dispatch(launchEnd());
		}, C.GAME_RANK_DURATION + devTime);
		dispatch({
			type: C.GAME_RANK,
			timeout: rankTimeout
		});
	};
};

launchEnd = (devTime = 0) => {
	return (dispatch, getState) => {
		clearTimeout(getState().game.get('timeout'));
		const endTimeout = setTimeout(() => {
			dispatch(launchIdle());
			dispatch(resetChoregraphy());
		}, C.GAME_END_DURATION + devTime);
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
			status.match(/idle|zoom/) &&
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
	launchAssets,
	launchIdle,
	launchZoom,
	launchIntro,
	launchTuto,
	launchWait,
	launchWarning,
	launchLoad,
	launchPlay,
	launchRecap,
	launchSave,
	launchRank,
	launchEnd,
	checkStatus,
};
