export const flattenArray = (arr) => {
	return arr.reduce((a, b) => {
		return a.concat(b);
	});
};
