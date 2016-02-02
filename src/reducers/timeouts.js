import C from '../constants';

const defaultState = {
	game: null,
	choregraphySteps: null,
	choregraphyEnd: null
};

export function timeouts(state = defaultState, action) {
	switch (action.type) {
		case C.GAME_TIMEOUT:
			return Object.assign({}, state, {
				game: action.timeout
			});
		case C.CHOREGRAPHY_STEPS_TIMEOUTS:
			return Object.assign({}, state, {
				choregraphySteps: action.timeouts
			});
		case C.CHOREGRAPHY_END_TIMEOUT:
			return Object.assign({}, state, {
				choregraphyEnd: action.timeout
			});
		default:
			return state;
	}
}
