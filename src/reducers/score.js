import C from '../constants';

export function score(state = 0, action) {
	switch (action.type) {
		case C.SCORE:
			return action.value;
		default:
			return state;
	}
}
