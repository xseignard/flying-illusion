import { Map } from 'immutable';
import C from '../../constants';

const defaultState = Map([
	['left', 'up'],
	['top', 'up'],
	['right', 'up'],
	['bottom', 'up']
]);

export function pads(state = defaultState, action) {
	switch (action.type) {
		case C.PAD:
			return state.set(action.direction, action.upOrDown);
		default:
			return state;
	}
}
