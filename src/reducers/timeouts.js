import C from '../constants';

const defaultState = {
	game: null,
	arrows: null
};

export function timeouts(state = defaultState, action) {
	switch (action.type) {
		case C.GAME_TIMEOUT:
			return Object.assign({}, state, {
				game: action.timeout
			});
		case C.ARROWS_TIMEOUTS:
			return Object.assign({}, state, {
				arrows: action.timeouts
			});
		default:
			return state;
	}
}
