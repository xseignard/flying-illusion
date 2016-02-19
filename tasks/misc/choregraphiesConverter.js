/*eslint-disable */
var parser = require('subtitles-parser'),
	fs = require('fs');
	path = require('path');

var subDir = path.join(__dirname, '..', '..', 'src', 'choregraphies');

var choregraphies = ['In_Training', 'Last_Resistance', 'The_Battle', 'The_Flying_Heroes'];

// duration that we can adjust to re-export subs
var duration = 4000;

choregraphies.forEach(function(choregraphy) {
	var subFilePath = path.join(subDir, choregraphy);
	var srt = fs.readFileSync(subFilePath + '.srt','utf8');
	var data = parser.fromSrt(srt, true);
	var newData = data.map(function(item) {
		return {
			id: item.id,
			startTime: (item.startTime - duration) > 0 ? item.startTime - duration : 0,
			endTime: item.startTime,
			text: item.text
		};
	});
	fs.writeFileSync(subFilePath + '.new.srt', parser.toSrt(newData), 'utf8');
});
