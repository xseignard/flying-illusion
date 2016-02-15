import { List } from 'immutable';
import C from '../constants';

const defaultState = List([]);

const setStatus = (moves, index, status) => {
	return moves.update(index, move => {
		return Object.assign({}, move, { status });
	});
};

export function choregraphy(state = defaultState, action) {
	switch (action.type) {
		case C.CHOREGRAPHY:
			return List(action.moves.map(move => {
				return Object.assign({}, move, { status: 'idle' });
			}));
		case C.MOVE_SHOW:
			return setStatus(state, action.index, 'show');
		case C.MOVE_HITTABLE:
			return setStatus(state, action.index, 'hittable');
		case C.MOVE_HIDE:
			return setStatus(state, action.index, 'hide');
		case C.MOVE_UNHITTABLE:
			return setStatus(state, action.index, 'unhittable');
		case C.MOVES_TIMEOUTS:
			return state.map((move, index) => {
				return Object.assign({}, move, action.timeouts[index]);
			});
		default:
			return state;
	}
}
