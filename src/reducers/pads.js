import C from '../constants';

const defaultState = {
	left: null,
	top: null,
	right: null,
	bottom: null
};

export function pads(state = defaultState, action) {
	switch (action.type) {
		case C.PAD:
			return Object.assign({}, state, {
				[action.direction]: action.upOrDown
			});
		default:
			return state;
	}
}
