import { combineReducers } from 'redux';
import { game } from './game';
import { pads } from './pads';
import { choregraphy } from './choregraphy';
import { dance } from './dance';
import { scores } from './scores';

const rootReducer = combineReducers({
	game,
	pads,
	choregraphy,
	dance,
	scores,
});

export default rootReducer;
