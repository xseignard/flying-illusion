export const listenToHardwarePads = (cb) => {
	// listen to messages coming from electron main process
	if (window.electron) {
		window.electron.ipcRenderer.on('pad', (event, data) => {
			console.log(Date.now());
			cb(data.eventType, data.direction);
		});
	}
};
