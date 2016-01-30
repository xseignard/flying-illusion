import C from '../constants';

export function steps(state = [], action) {
	switch (action.type) {
		case C.STEPS_ADD:
			return state.concat([{
				direction: action.direction,
				upOrDown: action.upOrDown,
				time: action.time
			}]);
		case C.STEPS_RESET:
			return [];
		default:
			return state;
	}
}
