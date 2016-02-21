import C from '../constants';

const dispatch = (action) => {
	self.postMessage({
		type: 'dispatch',
		action: JSON.stringify(action)
	});
};

export const setMovesTimeouts = (moves, forward = 0) => {
	const movesTimeouts = moves.map((move, index) => {
		const timeoutShow = setTimeout(() => {
			dispatch({
				type: C.MOVE_SHOW,
				index
			});
		}, move.showTime - forward);
		const timeoutCommentable = setTimeout(() => {
			dispatch({
				type: C.MOVE_COMMENTABLE,
				index
			});
		}, move.time - C.MOVE_TOLERANCE_OK - forward);
		const timeoutHide = setTimeout(() => {
			dispatch({
				type: C.MOVE_HIDE,
				index
			});
		}, move.time - forward);
		const timeoutUncommentable = setTimeout(() => {
			dispatch({
				type: C.MOVE_UNCOMMENTABLE,
				index
			});
		}, move.time + C.MOVE_TOLERANCE_OK - forward);
		return {
			timeoutShow,
			timeoutCommentable,
			timeoutHide,
			timeoutUncommentable
		};
	});
	dispatch({
		type: C.MOVES_TIMEOUTS,
		timeouts: movesTimeouts
	});
};

self.addEventListener('message', (event) => {
	if (event.data.function === 'setMovesTimeouts') {
		setMovesTimeouts(event.data.moves, event.data.forward);
	}
});
