export const sendToMaster = (action) => {
	self.postMessage(JSON.stringify({ action }));
};
