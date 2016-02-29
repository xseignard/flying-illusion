import C from '../../constants';

const defaultState = {
	combo: 1,
	score: 0,
	progression: 0,
	comments: {}
};

export function performance(state = defaultState, action) {
	switch (action.type) {
		case C.PERFORMANCE:
			return Object.assign({}, action.data);
		case C.PERFORMANCE_RESET:
			return Object.assign({}, defaultState);
		default:
			return state;
	}
}
