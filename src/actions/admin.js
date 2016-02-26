import C from '../constants';

const toggleAdmin = () => {
	return (dispatch, getState) => {
		if (getState().admin.get('visible')) {
			dispatch({ type: C.ADMIN_INVISIBLE });
		}
		else {
			dispatch({ type: C.ADMIN_VISIBLE });
		}
	};
};

export const listenToClicks = () => {
	return (dispatch, getState) => {
		if (!document) return;
		document.querySelector('body').addEventListener('click', (e) => {
			if (
				e.x < 100 &&
				e.y < 100
			) {
				dispatch(toggleAdmin());
			}
		});
	};
};

export const toggleMuted = () => {
	return (dispatch, getState) => {
		dispatch({
			type: C.ADMIN_MUTED,
			muted: !getState().admin.get('muted'),
		});
	};
};
