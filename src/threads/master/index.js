import C from '../../constants';
import { store } from '../../stores/master';
import { setMasterWorld } from './world';
import { onPadChange } from '../../actions/pads';

const electronSlave = {
	postMessage: (message) => {
		window.electron.ipcRenderer.send('message', message);
	},
	addEventListener: (message, onSlaveMessage) => {
		window.electron.ipcRenderer.on('message', (event, data) => {
			onSlaveMessage({ data });
		});
	}
};

export const universalSlave = C.WEBWORKER ?
	new Worker('slave.js') : electronSlave;

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
	if (data.toHardware && window.electron) {
		electronSlave.postMessage(data);
	}
};
