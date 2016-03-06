import { store } from '../stores/master';
import { setMasterWorld } from '../world/master';
import { onPadChange } from '../actions/pads';

export const universalSlave = typeof window.electron === 'undefined' ?
	new Worker('slave.js') : require('../electron/electron-slave');

export const sendToSlave = (message) => {
	universalSlave.postMessage(JSON.stringify(message));
};

export const dispatchToSlave = (action) => {
	const message = { function: 'dispatch', action };
	sendToSlave(message);
};

export const slaveRequestAnimationFrame = () => {
	const message = { function: 'slaveRequestAnimationFrame' };
	sendToSlave(message);
};

export const onSlaveMessage = (event) => {
	const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
	if (data.function === 'onPadChange') {
		store.dispatch(onPadChange(data.eventType, data.direction));
	}
	else if (data.function === 'setMasterWorld') {
		setMasterWorld(data.world);
	}
	else if (data.function === 'dispatch') {
		const action = Object.assign({}, data.action, { fromSlave: true });
		store.dispatch(action);
	}
};
