const slave = new Worker('slave.js');

export const listenToSlave = () => {
	return (dispatch, getState) => {
		const onSlaveMessage = (event) => {
			const data = JSON.parse(event.data);
			requestAnimationFrame(() => {
				if (data.function === 'dispatch') {
					dispatch(data.action);
				}
			});
		};
		slave.addEventListener('message', onSlaveMessage);
	};
};

export const sendToSlave = (message) => {
	slave.postMessage(JSON.stringify(message));
};

export const dispatchToSlave = (actionArg) => {
	const message = { function: 'dispatch', action: actionArg };
	sendToSlave(message);
};
