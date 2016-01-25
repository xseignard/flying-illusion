var electron = require('electron'),
	app = require('app'),
	BrowserWindow = require('browser-window'),
	globalShortcut = electron.globalShortcut;

require('crash-reporter').start();

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit();
});

app.on('ready', function() {
	var mainWindow = new BrowserWindow({ fullscreen: true });
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	if (process.platform === 'darwin') {
		globalShortcut.register('Alt+Command+I', function() {
			mainWindow.toggleDevTools();
		});
		globalShortcut.register('Comamnd+Shift+F', function() {
			mainWindow.setFullScreen(!mainWindow.isFullScreen());
		});
	}
	else {
		globalShortcut.register('Alt+Ctrl+I', function() {
			mainWindow.toggleDevTools();
		});
		globalShortcut.register('F11', function() {
			mainWindow.setFullScreen(!mainWindow.isFullScreen());
		});
	}

	// closing strategy
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
