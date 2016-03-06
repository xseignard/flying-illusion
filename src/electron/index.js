'use strict';
const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');
const dev = require('./dev');
const pads = require('./pads/index');

app.on('ready', () => {
	global.masterWindow = new BrowserWindow({
		useContentSize: true,
		width: 960,
		height: 540
	});
	dev.initDevHelpers(electron.globalShortcut, global.masterWindow);
	if (global.masterWindow.setAspectRatio) global.masterWindow.setAspectRatio(1920 / 1080);
	global.masterWindow.loadURL(`file://${__dirname}/../index.electron.html`);

	require('../slave');

	pads.onPadChange((padChange) => {
		global.masterWindow.webContents.send('message', padChange);
	});

	global.masterWindow.on('closed', () => {
		global.masterWindow = null;
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
