import C from '../constants';

export function moves(state = [], action) {
	switch (action.type) {
		case C.MOVES:
			return [].concat(action.moves);
		case C.MOVES_RESET:
			return [];
		case C.MOVE:
			return state.map((move) => {
				if (move.id === action.id) {
					return Object.assign({}, move, {
						status: action.status
					});
				}
				return move;
			});
		default:
			return state;
	}
}
