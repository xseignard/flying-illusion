import { Map, List } from 'immutable';
import C from '../constants';

const defaultState = Map([
	['name', null],
	['moves', List([])],
]);

const setStatus = (state, index, status) => {
	const movesList = state.get('moves').update(index, move => {
		return Object.assign({}, move, { status });
	});
	return state.set('moves', movesList);
};

export function choregraphy(state = defaultState, action) {
	switch (action.type) {
		case C.CHOREGRAPHY:
			const movesList = List(action.moves.map(move => {
				return Object.assign({}, move, { status: 'idle' });
			}));
			return Map([
				['name', action.name],
				['moves', movesList],
			]);
		case C.MOVE_SHOW:
			return setStatus(state, action.index, 'show');
		case C.MOVE_HITTABLE:
			return setStatus(state, action.index, 'hittable');
		case C.MOVE_HIDE:
			return setStatus(state, action.index, 'hide');
		case C.MOVE_UNHITTABLE:
			return setStatus(state, action.index, 'unhittable');
		case C.MOVES_TIMEOUTS:
			return state.set('moves', state.get('moves').map((move, index) => {
				return Object.assign({}, move, action.timeouts[index]);
			}));
		default:
			return state;
	}
}
