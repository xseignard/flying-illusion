import C from '../constants';

export function steps(state = [], action) {
	switch (action.type) {
		case C.STEP:
			return state.concat([{
				direction: action.direction,
				upOrDown: action.upOrDown,
				time: action.time
			}]);
		default:
			return state;
	}
}
