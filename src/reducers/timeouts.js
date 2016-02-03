import C from '../constants';

const defaultState = {
	game: null,
	moves: null
};

export function timeouts(state = defaultState, action) {
	switch (action.type) {
		case C.GAME_TIMEOUT:
			return Object.assign({}, state, {
				game: action.timeout
			});
		case C.MOVES_TIMEOUTS:
			return Object.assign({}, state, {
				moves: action.timeouts
			});
		default:
			return state;
	}
}
