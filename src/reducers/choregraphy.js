import C from '../constants';

const getMoveById = (moves, id) => {
	return moves.filter((move) => {
		return move.id === id;
	})[0];
};

export function choregraphy(state = [], action) {
	let moves = [].concat(state);
	switch (action.type) {
		case C.CHOREGRAPHY:
			moves = action.moves.map((move) => {
				return Object.assign({}, move, { status: 'idle' });
			});
			break;
		case C.MOVE_SHOW:
			const showMove = getMoveById(moves, action.id);
			showMove.status = 'show';
			break;
		case C.MOVE_PLAY:
			const playMove = getMoveById(moves, action.id);
			playMove.status = 'play';
			break;
		case C.MOVE_HIDE:
			const hideMove = getMoveById(moves, action.id);
			hideMove.status = 'end';
			break;
		default:
	}
	return moves;
}
