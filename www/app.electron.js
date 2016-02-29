'use strict';
const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = require('app');
const BrowserWindow = require('browser-window');
const globalShortcut = electron.globalShortcut;
const Pads = require('./hardware');

require('crash-reporter').start();

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
	let mainWindow = new BrowserWindow({ fullscreen: true });
	mainWindow.loadURL('file://' + __dirname + '/index.electron.html');

	if (process.platform === 'darwin') {
		globalShortcut.register('Alt+Command+I', () => {
			mainWindow.toggleDevTools();
		});
		globalShortcut.register('Comamnd+Shift+F', () => {
			mainWindow.setFullScreen(!mainWindow.isFullScreen());
		});
	}
	else {
		globalShortcut.register('Alt+Ctrl+I', () => {
			mainWindow.toggleDevTools();
		});
		globalShortcut.register('F11', () => {
			mainWindow.setFullScreen(!mainWindow.isFullScreen());
		});
	}

	// handle pads
	const pads = new Pads('/dev/ttyACM0');
	pads.once('ready', () => {
		console.log('ready');
	});
	pads.on('pad_event', (direction) => {
		const padChange = {
			eventType: 'keydown',
			direction: direction.trim()
		};
		console.log('pad_event', padChange);
		mainWindow.webContents.send('pad', padChange);
	});
	// listen for renderer process (web page) messages
	ipcMain.on('performance', (event, data) => {
		console.log(data);
		pads.lights(data);
	});

	// closing strategy
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});
