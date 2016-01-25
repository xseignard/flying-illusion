import { combineReducers } from 'redux';
import { TEST } from './actions';

// reducer dedicated to lang selection
function test(state = true, action) {
	switch (action.type) {
		case TEST:
			return action.test;
		default:
			return state;
	}
}

const reducers = combineReducers({
	test
});

export default reducers;
