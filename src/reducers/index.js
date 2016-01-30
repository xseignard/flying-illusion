import { combineReducers } from 'redux';
import { pads } from './pads';
import { game } from './game';
import { steps } from './steps';
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
	pads,
	steps
});

export default rootReducer;
