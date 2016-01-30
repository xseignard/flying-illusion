import subParser from 'subtitles-parser';
import moment from 'moment';

export default function (source) {
	const subs = subParser.fromSrt(source);
	return subs.map((sub) => {
		return {
			directions: sub.text.split('#'),
			startTime: moment.duration(sub.startTime).asMilliseconds(),
			endTime: moment.duration(sub.endTime).asMilliseconds()
		};
	});
}
