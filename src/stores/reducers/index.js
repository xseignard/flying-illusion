import { combineReducers } from 'redux';
import { admin } from './admin';
import { choregraphy } from './choregraphy';
import { dance } from './dance';
import { game } from './game';
import { pads } from './pads';
import { performance } from './performance';
import { hits } from './hits';
import { records } from './records';

const rootReducer = combineReducers({
	admin,
	game,
	pads,
	choregraphy,
	dance,
	performance,
	hits,
	records,
});

export default rootReducer;
