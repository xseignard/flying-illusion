/*
	runs in electron thread - patches web worker communication methods
*/

module.exports.postMessage = (message) => {
	window.electron.ipcRenderer.send('message', message);
};

module.exports.addEventListener = (message, onSlaveMessage) => {
	window.electron.ipcRenderer.on('message', (event, data) => {
		onSlaveMessage({ data });
	});
};
