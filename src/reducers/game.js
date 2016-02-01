import C from '../constants';

const defaultState = {
	status: 'started',
	timeout: null
};

export function game(state = defaultState, action) {
	switch (action.type) {
		case C.GAME:
			return {
				status: action.status,
				time: action.time,
				timeout: action.timeout
			};
		default:
			return state;
	}
}
