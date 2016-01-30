const mapKeyCodeToDirection = (keyCode) => {
	let value;
	switch (keyCode) {
		case '37':
			value = 'left';
			break;
		case '38':
			value = 'top';
			break;
		case '39':
			value = 'right';
			break;
		case '40':
			value = 'bottom';
			break;
		default:
			value = '';
	}
	return value;
};

export function listenToDirectionKeys(cb) {
	const isKeyDown = {
		left: false,
		top: false,
		right: false,
		bottom: false
	};

	const onKeyDown = (e) => {
		const direction = mapKeyCodeToDirection(e.keyCode.toString());
		if (direction.match(/left|top|right|bottom/)) {
			if (!isKeyDown[direction]) {
				isKeyDown[direction] = true;
				cb('keydown', direction);
			}
		}
	};

	const onKeyUp = (e) => {
		const direction = mapKeyCodeToDirection(e.keyCode.toString());
		if (direction.match(/left|top|right|bottom/)) {
			isKeyDown[direction] = false;
			cb('keyup', direction);
		}
	};

	if (document) {
		const body = document.querySelector('body');
		body.addEventListener('keyup', onKeyUp);
		body.addEventListener('keydown', onKeyDown);
	}
}
