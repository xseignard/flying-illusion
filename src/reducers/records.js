import { List } from 'immutable';
import C from '../constants';

const getDefaultState = () => {
	return List([]);
};

export function records(state = getDefaultState(), action) {
	switch (action.type) {
		case C.RECORD:
			return state.push({
				time: action.time,
				name: action.name,
				player: action.player,
				performance: action.performance
			});
		case C.RECORDS_LOADED:
			return List(action.records);
		case C.RECORDS_RESET:
			return getDefaultState();
		default:
			return state;
	}
}
