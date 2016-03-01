import { slave } from '../master';

export const sendToSlave = (message) => {
	slave.postMessage(JSON.stringify(message));
};

export const dispatchToSlave = (action) => {
	const message = { function: 'dispatch', action };
	sendToSlave(message);
};

export const slaveRequestAnimationFrame = () => {
	const message = { function: 'slaveRequestAnimationFrame' };
	sendToSlave(message);
};
