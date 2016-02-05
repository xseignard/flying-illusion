import { Map } from 'immutable';
import C from '../constants';

const defaultState = Map([
	['status', 'idle'],
	['timeout', null],
	['time', null],
]);

export function game(state = defaultState, action) {
	switch (action.type) {
		case C.GAME_IDLE:
			return state.set('status', 'idle');
		case C.GAME_INTRO:
			return state.set('status', 'intro');
		case C.GAME_WAIT:
			return state.set('status', 'wait');
		case C.GAME_LOAD:
			return state.set('status', 'load');
		case C.GAME_PLAY:
			return state
				.set('status', 'play')
				.set('time', action.time);
		case C.GAME_END:
			return state.set('status', 'end');
		case C.GAME_TIMEOUT:
			return state.set('timeout', action.timeout);
		default:
			return state;
	}
}
