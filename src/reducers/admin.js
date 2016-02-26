import { Map } from 'immutable';
import C from '../constants';

const defaultState = Map([
	['visible', false],
	['muted', true],
]);

export function admin(state = defaultState, action) {
	switch (action.type) {
		case C.ADMIN_VISIBLE:
			return state.set('visible', true);
		case C.ADMIN_INVISIBLE:
			return state.set('visible', false);
		case C.ADMIN_MUTED:
			return state.set('muted', action.muted);
		default:
			return state;
	}
}
