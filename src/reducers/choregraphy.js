import { Map } from 'immutable';
import C from '../constants';

const defaultState = Map([
	['name', null],
	['time', null]
]);

export function choregraphy(state = defaultState, action) {
	switch (action.type) {
		case C.CHOREGRAPHY:
			return state.set('name', action.name);
		case C.GAME_TUTO:
			return state.set('time', action.time);
		case C.GAME_PLAY:
			return state.set('time', action.time);
		default:
			return state;
	}
}
