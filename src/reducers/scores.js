import { List } from 'immutable';
import C from '../constants';

const getDefaultState = () => {
	return List([]);
};

export function scores(state = getDefaultState(), action) {
	switch (action.type) {
		case C.SCORE:
			return state.push({
				name: action.name,
				score: action.score
			});
		case C.SCORES_LOADED:
			return List(action.scores);
		case C.SCORES_RESET:
			return getDefaultState();
		default:
			return state;
	}
}
