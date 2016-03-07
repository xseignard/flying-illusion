/*
	runs in electron thread - patches web worker communication methods
*/
const pads = require('./electron/pads');

module.exports.addEventListener = (message, onMasterMessage) => {
	require('electron').ipcMain.on('message', (event, data) => {
		onMasterMessage({ data });
	});
};

module.exports.postMessage = message => {
	global.masterWindow.webContents.send('message', message);
};

module.exports.sendToHardware = message => {
	pads.lightPads(message);
};
