import C from '../constants';

export function steps(state = [], action) {
	switch (action.type) {
		case C.STEP:
			return state.concat([{
				direction: action.direction,
				time: action.time
			}]);
		case C.STEPS_RESET:
			return [];
		default:
			return state;
	}
}
