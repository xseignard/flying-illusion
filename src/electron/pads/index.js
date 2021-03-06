'use strict';
const Pads = process.platform === 'linux' ?
	require('./hardware') : require('./hardwareMock');
const fs = require('fs');

let port = '/dev/ttyACM0';

try {
	fs.statSync(port).isFile();
}
catch (err) {
	port = '/dev/ttyUSB0';
}
const pads = new Pads(port);

const onPadChange = (cb) => {
	pads.on('pad_event', cb);
};

let previousSnapshots = {
	left: { lastComment: '', commentCount: 0 },
	top: { lastComment: '', commentCount: 0 },
	bottom: { lastComment: '', commentCount: 0 },
	right: { lastComment: '', commentCount: 0 }
};

const lightPads = (message) => {
	if (message.function === 'feedback') {
		const snapshots = message.snapshots;
		const lightsData = {};
		['left', 'top', 'bottom', 'right'].forEach((direction) => {
			if (snapshots[direction].commentCount !== previousSnapshots[direction].commentCount) {
				if (snapshots[direction].lastComment !== 'fail') lightsData[direction] = false;
			}
		});
		previousSnapshots = snapshots;
		pads.lights(lightsData);
	}
	else if (message.function === 'glow') {
		pads.glow();
	}
	else if (message.function === 'off') {
		pads.off();
	}
	else if (message.function === 'leftRight') {
		pads.leftRight();
	}
	else if (message.function === 'right') {
		pads.right();
	}
	else if (message.function === 'all') {
		pads.all();
	}
	// TODO: maybe other functions to handle
};

module.exports = {
	onPadChange,
	lightPads
};
