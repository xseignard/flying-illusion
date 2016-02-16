import { List } from 'immutable';
import C from '../constants';

const getDefaultState = () => {
	return List([]);
};

export function ranks(state = getDefaultState(), action) {
	switch (action.type) {
		case C.RANK:
			return state.push({
				name: action.name,
				score: action.score
			});
		case C.RANKS_LOADED:
			return List(action.ranks);
		default:
			return state;
	}
}
