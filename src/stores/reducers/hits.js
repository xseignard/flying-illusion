import C from '../../constants';

const defaultState = {
	left: false,
	top: false,
	bottom: false,
	right: false,
	showHits: false,
};

export function hits(state = defaultState, action) {
	switch (action.type) {
		case C.STATS:
			return Object.assign({}, action.data.hits);
		case C.STATS_RESET:
			return Object.assign({}, defaultState);
		default:
			return state;
	}
}
