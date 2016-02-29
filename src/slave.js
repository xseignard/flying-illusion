import C from './constants';
import { store } from './stores/slave';
import { setMovesTimeouts, stopMoves } from './actions/moves';
import {
	S,
	world,
	initWorld,
	onSlaveRequestAnimationFrame,
	listenToStore,
	stopListenToStore,
} from './world/slave';

export const sendToMaster = (message) => {
	self.postMessage(JSON.stringify(message));
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

export const listenToMaster = () => {
	return (dispatch, getState) => {
		const onMasterMessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.function === 'slaveRequestAnimationFrame') {
				sendToMaster({ function: 'setMasterWorld', world });
				dispatch(onSlaveRequestAnimationFrame());
			}
			else if (data.function === 'dispatch') {
				dispatch(onDispatchFromMaster(data));
			}
			else if (data.function === 'setMovesTimeouts') {
				dispatch(setMovesTimeouts(data.forward));
			}
			else if (data.function === 'stopMoves') {
				dispatch(stopMoves());
			}
		};
		self.addEventListener('message', onMasterMessage);
	};
};

store.dispatch(listenToMaster());
