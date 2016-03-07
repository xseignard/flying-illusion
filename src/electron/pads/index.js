'use strict';
const Pads = process.platform === 'linux' ?
	require('./hardware') : require('./hardwareMock');

const pads = new Pads('/dev/ttyACM0');

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
				if (snapshots[direction].lastComment.match(/miss|fail/)) lightsData[direction] = true;
				else lightsData[direction] = false;
			}
		});
		previousSnapshots = snapshots;
		pads.lights(lightsData);
	}
	else if (message.function === 'glow') {
		pads.glow();
	}
	// TODO: maybe other functions to handle
};

module.exports = {
	onPadChange,
	lightPads
};
