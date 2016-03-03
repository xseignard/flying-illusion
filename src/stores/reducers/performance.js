import C from '../../constants';

const defaultState = {
	combo: 1,
	comboMax: 1,
	score: 0,
	progression: 0,
	comments: {}
};

export function performance(state = defaultState, action) {
	switch (action.type) {
		case C.STATS:
			return Object.assign({}, action.data.performance);
		case C.STATS_RESET:
			return Object.assign({}, defaultState);
		default:
			return state;
	}
}
