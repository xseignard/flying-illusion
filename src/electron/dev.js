'use strict';

const initDevHelpers = (globalShortcut, masterWindow, app) => {
	if (process.platform === 'darwin') {
		globalShortcut.register('Alt+Command+I', () => {
			masterWindow.toggleDevTools();
		});
		globalShortcut.register('Command+Shift+F', () => {
			masterWindow.setFullScreen(!masterWindow.isFullScreen());
		});
	}
	else {
		globalShortcut.register('Alt+Ctrl+I', () => {
			masterWindow.toggleDevTools();
		});
		globalShortcut.register('F11', () => {
			masterWindow.setFullScreen(!masterWindow.isFullScreen());
		});
		globalShortcut.register('q', () => {
			app.quit();
		});
	}
};

module.exports = { initDevHelpers };
