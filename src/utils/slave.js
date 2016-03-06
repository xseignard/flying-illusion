import C from '../constants';
import { store } from '../stores/slave';
import { setTutoStepsTimeouts } from '../actions/tuto';
import { setMovesTimeouts, stopMoves } from '../actions/moves';
import {
	S,
	world,
	initWorld,
	resetWorld,
	onSlaveRequestAnimationFrame,
	listenToStore,
	stopListenToStore,
} from '../world/slave';

export const universalSelf = typeof self !== 'undefined' ?
	self : require('../electron/electron-self');

export const sendToMaster = (message) => {
	universalSelf.postMessage(JSON.stringify(message));
};

export const dispatchToMaster = (action) => {
	const message = { function: 'dispatch', action };
	sendToMaster(message);
};

const onDispatchFromMaster = (data) => {
	return (dispatch, getState) => {
		const action = Object.assign({}, data.action, { fromMaster: true });
		if (
			action.type === C.GAME_WAIT ||
			action.type === C.GAME_RECAP
		) {
			if (stopListenToStore) stopListenToStore();
			dispatch(resetWorld());
		}
		dispatch(action);
		if (action.type === C.CHOREGRAPHY) {
			S.choregraphyTime = getState().choregraphy.get('time');
			dispatch(initWorld());
			dispatch(listenToStore());
		}
	};
};

export const onMasterMessage = (event) => {
	const data = JSON.parse(event.data);
	if (data.function === 'slaveRequestAnimationFrame') {
		sendToMaster({ function: 'setMasterWorld', world });
		store.dispatch(onSlaveRequestAnimationFrame());
	}
	else if (data.function === 'dispatch') {
		store.dispatch(onDispatchFromMaster(data));
	}
	else if (data.function === 'setGameTimeouts') {
		store.dispatch(setMovesTimeouts());
		if (data.isTuto) store.dispatch(setTutoStepsTimeouts());
	}
	else if (data.function === 'stopMoves') {
		store.dispatch(stopMoves());
	}
};
