import C from '../constants';

export function targetSteps(state = [], action) {
	switch (action.type) {
		case C.TARGET_STEP:
			return state.concat([{
				direction: action.direction,
				time: action.time
			}]);
		case C.RESET_TARGET_STEPS:
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
