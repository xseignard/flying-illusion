import { Map } from 'immutable';
import C from '../../constants';

const defaultState = Map([
	['name', null],
	['time', null]
]);

export function choregraphy(state = defaultState, action) {
	switch (action.type) {
		case C.CHOREGRAPHY:
			return state
				.set('name', action.name)
				.set('time', action.time);
		case C.CHOREGRAPHY_RESET:
			return defaultState;
		default:
			return state;
	}
}
