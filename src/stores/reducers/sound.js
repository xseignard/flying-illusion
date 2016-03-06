import { Map } from 'immutable';
import C from '../../constants';

const defaultState = Map([
	['name', null],
]);

export function sound(state = defaultState, action) {
	switch (action.type) {
		case C.SOUND:
			return state.set('name', action.name);
		default:
			return state;
	}
}
