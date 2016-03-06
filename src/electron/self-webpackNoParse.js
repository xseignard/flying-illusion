/*
	runs in electron thread - patches web worker communication methods
*/

module.exports.addEventListener = (message, onMasterMessage) => {
	require('electron').ipcMain.on('message', (event, data) => {
		onMasterMessage({ data });
	});
};

module.exports.postMessage = message => {
	global.masterWindow.webContents.send('message', message);
};
