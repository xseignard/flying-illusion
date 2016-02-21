import C from '../constants';
import MovesWorker from '../workers/moves.worker';

const movesWorker = new MovesWorker();

export const listenToMovesWorker = () => {
	return (dispatch, getState) => {
		const onWorkerMessage = (event) => {
			requestAnimationFrame(dispatch.bind(null, JSON.parse(event.data.action)));
		};
		movesWorker.addEventListener('message', onWorkerMessage);
	};
};

export const getMovesEndTime = (moves) => {
	return moves.last().time + C.MOVES_END_DELAY;
};

export const setMovesTimeouts = (forward = 0) => {
	return (dispatch, getState) => {
		const movesArray = getState().dance.get('moves').toArray();
		movesWorker.postMessage({
			function: 'setMovesTimeouts',
			moves: movesArray,
			forward
		});
	};
};

const movesTimeouts = [
	'timeoutShow',
	'timeoutCommentable',
	'timeoutHide',
	'timeoutUncommentable'
];

export const stopMoves = () => {
	return (dispatch, getState) => {
		const state = getState();
		state.dance.get('moves').forEach((move) => {
			movesTimeouts.forEach((timeout) => {
				clearTimeout(move[timeout]);
			});
		});
	};
};
