import subParser from 'subtitles-parser';
import moment from 'moment';

export default function (source) {
	const steps = subParser.fromSrt(source);
	return steps.map((current) => {
		return {
			steps: current.text.split('#'),
			startTime: moment.duration(current.startTime).asMilliseconds(),
			endTime: moment.duration(current.endTime).asMilliseconds()
		};
	});
}
