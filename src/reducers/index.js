import { combineReducers } from 'redux';
import { admin } from './admin';
import { game } from './game';
import { pads } from './pads';
import { choregraphy } from './choregraphy';
import { dance } from './dance';
import { records } from './records';

const rootReducer = combineReducers({
	admin,
	game,
	pads,
	choregraphy,
	dance,
	records,
});

export default rootReducer;
