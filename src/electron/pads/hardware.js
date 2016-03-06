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
			this.emit('pad_event', {
				function: 'onPadChange',
				eventType: parsedData[1].trim(),
				direction: parsedData[0].trim()
			});
		});
	}
	lights(data) {
		this.sp.write(JSON.stringify(data), (err, results) => {
			if (err) console.log(err);
		});
	}
}

module.exports = Pads;
