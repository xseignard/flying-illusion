'use strict';
const serialport = require('serialport');
const SerialPort = serialport.SerialPort;
const EventEmitter = require('events').EventEmitter;

class Pads extends EventEmitter {
	constructor(port) {
		super();
		this.sp = new SerialPort(port, {
			parser: serialport.parsers.readline('\n')
		});
		this.sp.once('open', () => {
			this.emit('ready');
		});
		this.sp.on('data', (data) => {
			const parsedData = data.split(';');
			if (parsedData.length === 2) {
				this.emit('pad_event', {
					function: 'onPadChange',
					eventType: parsedData[1].trim(),
					direction: parsedData[0].trim()
				});
			}
		});
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
			this.sp.write(message, (err, results) => {
				if (err) console.log(err);
			});
		}
	}
	off() {
		console.log('off');
		this.sp.write('0#', (err, results) => {
			if (err) console.log(err);
		});
	}
	glow() {
		console.log('glow');
		this.sp.write('1#', (err, results) => {
			if (err) console.log(err);
		});
	}
	leftRight() {
		console.log('leftRight');
		this.sp.write('2#', (err, results) => {
			if (err) console.log(err);
		});
	}
	right() {
		console.log('right');
		this.sp.write('3#', (err, results) => {
			if (err) console.log(err);
		});
	}
	all() {
		console.log('all');
		this.sp.write('4#', (err, results) => {
			if (err) console.log(err);
		});
	}
}

module.exports = Pads;
