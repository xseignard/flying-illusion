'use strict';
const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');
const dev = require('./dev');
const pads = require('./pads/index');
const ipcMain = electron.ipcMain;

app.on('ready', () => {
	global.masterWindow = new BrowserWindow({
		useContentSize: true,
		fullscreen: true,
		frame: false
	});
	dev.initDevHelpers(electron.globalShortcut, global.masterWindow);
	if (global.masterWindow.setAspectRatio) global.masterWindow.setAspectRatio(1920 / 1080);
	global.masterWindow.loadURL(`file://${__dirname}/../index.electron.html`);

	// TODO : change from IPC to webworker here
	// IPC
	// require('../slave');
	// webworker
	ipcMain.on('message', (event, data) => {
		pads.lightPads(data);
	});
	// end of ipc/webworker switch

	pads.onPadChange((padChange) => {
		global.masterWindow.webContents.send('message', JSON.stringify(padChange));
	});

	global.masterWindow.on('closed', () => {
		global.masterWindow = null;
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
