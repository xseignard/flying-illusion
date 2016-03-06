import { combineReducers } from 'redux';
import { admin } from './admin';
import { choregraphy } from './choregraphy';
import { dance } from './dance';
import { game } from './game';
import { hits } from './hits';
import { pads } from './pads';
import { performance } from './performance';
import { records } from './records';
import { sound } from './sound';

const rootReducer = combineReducers({
	admin,
	choregraphy,
	dance,
	game,
	hits,
	pads,
	performance,
	records,
	sound,
});

export default rootReducer;
