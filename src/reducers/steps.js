import { List } from 'immutable';
import C from '../constants';

const getDefaultState = () => {
	return List([]);
};

export function steps(state = getDefaultState(), action) {
	switch (action.type) {
		case C.STEP:
			return state.push({
				direction: action.direction,
				time: action.time
			});
		case C.STEPS_RESET:
			return getDefaultState();
		default:
			return state;
	}
}
