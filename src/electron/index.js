'use strict';
const E = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');
const D = require('./dev');
const pads = require('./pads');

require('crash-reporter').start();

app.on('ready', () => {
	let mainWindow = new BrowserWindow({ fullscreen: true });
	mainWindow.loadURL(`file://${__dirname}/../index.electron.html`);

	D.initDevHelpers(E.globalShortcut, mainWindow);

	pads.listenToPads((padChange) => {
		mainWindow.webContents.send('pad', padChange);
	});
	E.ipcMain.on('performance', (event, data) => {
		pads.lightPads(data);
	});

	// closing strategy
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
