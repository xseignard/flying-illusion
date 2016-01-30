var subParser = require('subtitles-parser'),
	moment = require('moment');

module.exports = function(source) {
	var steps = subParser.fromSrt(source);
	steps.map(function(current) {
		current.steps = current.text.split('#');
		delete current.text;
		current.startTime = moment.duration(current.startTime).asMilliseconds();
		current.endTime = moment.duration(current.endTime).asMilliseconds();
		console.log(current);
	});
	return steps;
};
