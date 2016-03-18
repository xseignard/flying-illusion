'use strict';
const EventEmitter = require('events').EventEmitter;

class Pads extends EventEmitter {
	constructor(port) {
		super();
		this.emit('ready');
		// setInterval(() => {
		// 	console.log('PAD');
		// 	this.emit('pad_event', {
		// 		function: 'onPadChange',
		// 		eventType: 'keydown',
		// 		direction: 'left'
		// 	});
		// }, 3000);
	}
	lights(data) {
		const keys = Object.keys(data);
		// FIXME: dirty hack in order not to handle messages that should'nt be
		// e.g. messages with more than 2 directions
		if (keys.length <= 2) {
			let message = '';
			['left', 'top', 'bottom', 'right'].forEach((direction) => {
				if (typeof data[direction] !== 'undefined') {
					message += data[direction] ? '2' : '1';
				}
				else message += '0';
				if (direction === 'right') message += '#';
			});
			console.log(message);
		}
	}
	off() {
		console.log('off');
	}
	glow() {
		console.log('glow');
	}
	leftRight() {
		console.log('leftRight');
	}
	right() {
		console.log('right');
	}
	all() {
		console.log('all');
	}
}

module.exports = Pads;
