const onKeyDown = (e) => {
	return dispatch => {
		if (e.keyCode.toString().match(/37|38|39|40/)) {
			dispatch({
				type: 'PAD_DOWN',
				value: e.keyCode.toString()
			});
		}
	};
};

const body = document.querySelector('body');
let cb = null;

export function listenToKeyDown() {
	return dispatch => {
		cb = cb ? cb : (e) => {
			dispatch(onKeyDown(e));
		};
		body.removeEventListener('keydown', cb);
		body.addEventListener('keydown', cb);
	};
}
