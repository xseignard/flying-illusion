import { Map } from 'immutable';
import C from '../../constants';

const defaultState = Map([
	['status', 'devplay'],
	['timeout', null],
]);

export function game(state = defaultState, action) {
	switch (action.type) {
		case C.GAME_ASSETS:
			return state
				.set('status', 'assets')
				.set('timeout', action.timeout);
		case C.GAME_IDLE:
			return state
				.set('status', 'idle')
				.set('timeout', action.timeout);
		case C.GAME_ZOOM:
			return state
				.set('status', 'zoom')
				.set('timeout', action.timeout);
		case C.GAME_INTRO:
			return state
				.set('status', 'intro')
				.set('timeout', action.timeout);
		case C.GAME_TUTO:
			return state
				.set('status', 'tuto')
				.set('timeout', action.timeout);
		case C.GAME_WAIT:
			return state
				.set('status', 'wait')
				.set('timeout', action.timeout);
		case C.GAME_WARNING:
			return state
				.set('status', 'warning')
				.set('timeout', action.timeout);
		case C.GAME_LOAD:
			return state
				.set('status', 'load')
				.set('timeout', action.timeout);
		case C.GAME_PLAY:
			return state
				.set('status', 'play')
				.set('timeout', action.timeout);
		case C.GAME_RECAP:
			return state
				.set('status', 'recap')
				.set('timeout', action.timeout);
		case C.GAME_SAVE:
			return state
				.set('status', 'save')
				.set('timeout', action.timeout);
		case C.GAME_RANK:
			return state
				.set('status', 'rank')
				.set('timeout', action.timeout);
		case C.GAME_END:
			return state
				.set('status', 'end')
				.set('timeout', action.timeout);
		default:
			return state;
	}
}
