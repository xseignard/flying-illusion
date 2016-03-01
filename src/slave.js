import C from './constants';
import { store } from './stores/slave';
import { setMovesTimeouts, stopMoves } from './actions/moves';
import { sendToMaster } from './utils/slave';
import {
	S,
	world,
	initWorld,
	onSlaveRequestAnimationFrame,
	listenToStore,
	stopListenToStore,
} from './world/slave';

const onDispatchFromMaster = (data) => {
	return (dispatch, getState) => {
		const action = Object.assign({}, data.action, { fromMaster: true });
		if (
			action.type === C.GAME_WAIT ||
			action.type === C.GAME_RECAP
		) {
			stopListenToStore();
		}
		dispatch(action);
		if (
			action.type === C.GAME_TUTO ||
			action.type === C.GAME_PLAY
		) {
			S.choregraphyTime = getState().choregraphy.get('time');
			dispatch(initWorld());
			dispatch(listenToStore());
		}
	};
};

const onMasterMessage = (event) => {
	const data = JSON.parse(event.data);
	if (data.function === 'slaveRequestAnimationFrame') {
		sendToMaster({ function: 'setMasterWorld', world });
		store.dispatch(onSlaveRequestAnimationFrame());
	}
	else if (data.function === 'dispatch') {
		store.dispatch(onDispatchFromMaster(data));
	}
	else if (data.function === 'setMovesTimeouts') {
		store.dispatch(setMovesTimeouts(data.forward));
	}
	else if (data.function === 'stopMoves') {
		store.dispatch(stopMoves());
	}
};
self.addEventListener('message', onMasterMessage);
