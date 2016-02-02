import { combineReducers } from 'redux';
import { game } from './game';
import { choregraphy } from './choregraphy';
import { arrows } from './arrows';
import { pads } from './pads';
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
	game,
	choregraphy,
	arrows,
	pads,
	steps,
	timeouts,
	test,
});

export default rootReducer;
