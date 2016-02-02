import { combineReducers } from 'redux';
import { game } from './game';
import { moves } from './moves';
import { pads } from './pads';
import { steps } from './steps';
import { score } from './score';
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
	moves,
	pads,
	steps,
	score,
	timeouts,
	test,
});

export default rootReducer;
