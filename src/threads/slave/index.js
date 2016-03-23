import C from '../../constants';
import { store } from '../../stores/slave';
import { setTutoStepsTimeouts } from '../../actions/tuto';
import { setMovesTimeouts, stopMoves } from '../../actions/moves';
import {
	S,
	world,
	initWorld,
	resetWorld,
	onSlaveRequestAnimationFrame,
	listenToStore,
	stopListenToStore,
} from './world';

// ipc/webworker switch : pass it to false to switch to electron IPC
export const universalSelf = C.WEBWORKER ?
	self : require('../../electron/self-webpackNoParse');
// end of ipc/webworker switch

export const sendToMaster = (message) => {
	universalSelf.postMessage(JSON.stringify(message));
};

export const sendToHardware = (message) => {
	// send message to master with some appropriate flag that
	// will tell the master to send the message to hardware
	if (C.WEBWORKER) {
		const newMessage = Object.assign({}, message, { toHardware: true });
		sendToMaster(newMessage);
	}
	// otherwise use IPC
	else {
		universalSelf.sendToHardware(message);
	}
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
		// TODO: maybe handle more status to send to hardware
		if (action.type === C.GAME_IDLE) sendToHardware({ function: 'glow' });
		else if (action.type === C.GAME_INTRO) sendToHardware({ function: 'off' });
		else if (action.type === C.GAME_WAIT) sendToHardware({ function: 'leftRight' });
		else if (action.type === C.GAME_LOAD) sendToHardware({ function: 'off' });
		else if (action.type === C.GAME_RECAP) sendToHardware({ function: 'right' });
		else if (action.type === C.GAME_SAVE) sendToHardware({ function: 'all' });
		else if (action.type === C.GAME_RANK) sendToHardware({ function: 'right' });
		else if (action.type === C.GAME_END) sendToHardware({ function: 'right' });
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
