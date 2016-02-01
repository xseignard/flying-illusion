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
