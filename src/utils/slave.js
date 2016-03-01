export const sendToMaster = (message) => {
	self.postMessage(JSON.stringify(message));
};

export const dispatchToMaster = (action) => {
	const message = { function: 'dispatch', action };
	sendToMaster(message);
};
