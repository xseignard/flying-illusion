'use strict';
const EventEmitter = require('events').EventEmitter;

class Pads extends EventEmitter {
	constructor(port) {
		super();
		this.emit('ready');
		// setInterval(() => {
		// 	this.emit('pad_event', 'left');
		// }, 10000);
	}
	lights(data) {
		console.log(
			'method lights in hardwareMock: data === ',
			JSON.stringify(data)
		);
	}
}

module.exports = Pads;
