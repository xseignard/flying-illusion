import C from '../constants';

export function game(state = {
	status: 'intro',
	timeout: null
}, action) {
	switch (action.type) {
		case C.GAME_STATUS:
			return {
				status: action.status,
				timeout: action.timeout
			};
		default:
			return state;
	}
}
