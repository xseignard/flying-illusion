const slave = new Worker('slave.js');

export const listenToSlave = () => {
	return (dispatch, getState) => {
		const onSlaveMessage = (event) => {
			requestAnimationFrame(dispatch.bind(null, JSON.parse(event.data).action));
		};
		slave.addEventListener('message', onSlaveMessage);
	};
};

export const sendToSlave = (message) => {
	return (dispatch, getState) => {
		slave.postMessage(JSON.stringify(message));
	};
};
