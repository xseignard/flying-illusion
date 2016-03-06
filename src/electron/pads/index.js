'use strict';
const Pads = process.platform === 'linux' ?
	require('./hardware') : require('./hardwareMock');

const pads = new Pads('/dev/ttyACM0');

const onPadChange = (cb) => {
	pads.on('pad_event', (direction) => {
		cb({
			function: 'onPadChange',
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
	onPadChange,
	lightPads
};
