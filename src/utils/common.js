export const flattenArray = (arr) => {
	return arr.reduce((a, b) => {
		return a.concat(b);
	});
};

// http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
export const filterOutDuplicates = (arr) => {
	return arr.filter((item, pos, self) => {
		return self.indexOf(item) === pos;
	});
};

export const sum = (array) => {
	return array.reduce((first, second) => {
		return first + second;
	}, 0);
};

export const getItemByInfiniteIndex = (array, index) => {
	const reasonnableIndex = index % array.length;
	if (reasonnableIndex < 0) return array[array.length + reasonnableIndex];
	return array[reasonnableIndex];
};

export const alphabet = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G',
	'H', 'I', 'J', 'K', 'L', 'M', 'N',
	'O', 'P', 'Q', 'R', 'S', 'T', 'U',
	'V', 'W', 'X', 'Y', 'Z', '0', '1',
	'2', '3', '4', '5', '6', '7', '8',
	'9'
];
