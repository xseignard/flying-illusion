import C from '../constants';

const dispatch = (action) => {
	self.postMessage({
		type: 'dispatch',
		action
	});
};

const startChoregraphy = (moves) => {
	dispatch({
		type: C.CHOREGRAPHY,
		moves
	});
	const movesTimeouts = moves.map((move, index) => {
		const showTimeout = setTimeout(() => {
			dispatch({
				type: C.MOVE_SHOW,
				index
			});
		}, move.showTime);
		const hideTimeout = setTimeout(() => {
			dispatch({
				type: C.MOVE_HIDE,
				index
			});
		}, move.time + C.MOVE_TOLERANCE_OK);
		return {
			showTimeout,
			hideTimeout
		};
	});
	dispatch({
		type: C.MOVES_TIMEOUTS,
		timeouts: movesTimeouts
	});
};

self.onmessage = (event) => {
	if (event.data.type === 'choregraphyStart') {
		startChoregraphy(event.data.moves);
	}
};
