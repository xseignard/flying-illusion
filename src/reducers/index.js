import { combineReducers } from 'redux';
import { pads } from './pads';
import { game } from './game';
import { choregraphy } from './choregraphy';
import { steps } from './steps';
import { timeouts } from './timeouts';
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
	pads,
	game,
	choregraphy,
	steps,
	timeouts,
	test,
});

export default rootReducer;
