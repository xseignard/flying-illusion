import C from '../constants';

export function choregraphySteps(state = [], action) {
	switch (action.type) {
		case C.CHOREGRAPHY_STEP:
			return state.concat([{
				direction: action.direction,
				start: action.start,
				end: action.end
			}]);
		case C.RESET_CHOREGRAPHY_STEPS:
			return [];
		default:
			return state;
	}
}

export function playerSteps(state = [], action) {
	switch (action.type) {
		case C.PLAYER_STEP:
			return state.concat([{
				direction: action.direction,
				time: action.time
			}]);
		case C.RESET_PLAYER_STEPS:
			return [];
		default:
			return state;
	}
}
