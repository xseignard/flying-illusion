export const flattenArray = (arr) => {
	return arr.reduce((a, b) => {
		return a.concat(b);
	});
};

export const sum = (array) => {
	return array.reduce((first, second) => {
		return first + second;
	}, 0);
};

const gameStatusRegexp = /tuto|play/;

export const isGame = (game) => {
	return game.get('status').match(gameStatusRegexp);
};
