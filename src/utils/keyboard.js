import { store } from '../stores/master';
import { onPadChange } from '../actions/pads';

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

const directionsRegExp = /left|top|right|bottom/;

export function listenToDirectionKeys(cb) {
	const isKeyDown = {
		left: false,
		top: false,
		right: false,
		bottom: false
	};

	const onKeyDown = (e) => {
		const direction = mapKeyCodeToDirection(e.keyCode.toString());
		if (direction.match(directionsRegExp)) {
			e.stopPropagation();
			e.preventDefault();
			if (!isKeyDown[direction]) {
				isKeyDown[direction] = true;
				cb('keydown', direction);
			}
		}
	};

	const onKeyUp = (e) => {
		const direction = mapKeyCodeToDirection(e.keyCode.toString());
		if (direction.match(directionsRegExp)) {
			e.stopPropagation();
			e.preventDefault();
			isKeyDown[direction] = false;
			cb('keyup', direction);
		}
	};

	if (document) {
		const body = document.querySelector('body');
		body.removeEventListener('keyup', onKeyUp);
		body.removeEventListener('keydown', onKeyDown);
		body.addEventListener('keyup', onKeyUp);
		body.addEventListener('keydown', onKeyDown);
	}
}

export const initKeyboard = () => {
	listenToDirectionKeys((eventType, direction) => {
		store.dispatch(onPadChange(eventType, direction));
	});
};
