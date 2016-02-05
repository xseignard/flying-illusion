import { Map } from 'immutable';
import C from '../constants';

const defaultState = Map([
	['left', null],
	['top', null],
	['right', null],
	['bottom', null]
]);

export function pads(state = defaultState, action) {
	switch (action.type) {
		case C.PAD:
			return state.set(action.direction, action.upOrDown);
		default:
			return state;
	}
}
