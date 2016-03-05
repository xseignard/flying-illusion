'use strict';
const Pads = process.platform === 'linux' ?
	require('./hardware') : require('./hardwareMock');

const pads = new Pads('/dev/ttyACM0');

const listenToPads = (cb) => {
	pads.once('ready', () => {
		console.log('ready');
	});
	pads.on('pad_event', (direction) => {
		cb({
			eventType: 'keydown',
			direction: direction.trim()
		});
	});
};

const lightPads = (comment) => {
	const data = { comment };
	pads.lights(data);
};

module.exports = {
	listenToPads,
	lightPads
};
