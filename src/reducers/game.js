import C from '../constants';

const defaultState = {
	status: 'idle',
	time: null
};

export function game(state = defaultState, action) {
	switch (action.type) {
		case C.GAME:
			return {
				status: action.status,
				time: action.time
			};
		default:
			return state;
	}
}
