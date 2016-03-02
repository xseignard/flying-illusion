const showWebglRegexp = /tuto|wait|warning|load|play/;
export const showWebgl = (game) => {
	return game.get('status').match(showWebglRegexp);
};

const isGameRegexp = /tuto|play/;
export const isGame = (game) => {
	return game.get('status').match(isGameRegexp);
};

export const isTuto = (game) => {
	return game.get('status').match('tuto');
};

const showFinalRegexp = /recap|save|rank/;
export const showFinal = (game) => {
	return game.get('status').match(showFinalRegexp);
};
