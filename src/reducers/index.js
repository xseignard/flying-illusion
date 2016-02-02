import { combineReducers } from 'redux';
import { pads } from './pads';
import { game } from './game';
import { score } from './score';
import { timeouts } from './timeouts';
import { choregraphySteps, playerSteps } from './steps';
import { TEST } from '../actions';

// reducer dedicated to lang selection
function test(state = true, action) {
	switch (action.type) {
		case TEST:
			return action.test;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	test,
	game,
	score,
	pads,
	timeouts,
	playerSteps,
	choregraphySteps
});

export default rootReducer;
