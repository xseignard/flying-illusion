const showWebglRegexp = /tuto|wait|load|play/;
export const showWebgl = (game) => {
	return game.get('status').match(showWebglRegexp);
};

const showPerformanceRegexp = /tuto|play/;
export const showPerformance = (game) => {
	return game.get('status').match(showPerformanceRegexp);
};

const showFinalRegexp = /recap|save|rank/;
export const showFinal = (game) => {
	return game.get('status').match(showFinalRegexp);
};
