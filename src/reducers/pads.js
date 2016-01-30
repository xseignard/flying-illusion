import C from '../constants';

export function pads(state = {
	left: null,
	top: null,
	right: null,
	bottom: null
}, action) {
	switch (action.type) {
		case C.PAD:
			return Object.assign({}, state, {
				[action.direction]: action.upOrDown
			});
		default:
			return state;
	}
}
