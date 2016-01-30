import C from '../constants';

export function game(state = 'intro', action) {
	switch (action.type) {
		case C.GAME:
			return action.status;
		default:
			return state;
	}
}
