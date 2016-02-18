import { combineReducers } from 'redux';
import { game } from './game';
import { pads } from './pads';
import { choregraphy } from './choregraphy';
import { dance } from './dance';
import { ranks } from './ranks';
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
	pads,
	choregraphy,
	dance,
	ranks,
	test,
});

export default rootReducer;
