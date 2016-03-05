'use strict';

const initDevHelpers = (globalShortcut, mainWindow) => {
	if (process.platform === 'darwin') {
		globalShortcut.register('Alt+Command+I', () => {
			mainWindow.toggleDevTools();
		});
		globalShortcut.register('Command+Shift+F', () => {
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
};

module.exports = { initDevHelpers };
