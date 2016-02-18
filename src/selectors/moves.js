import { createSelector } from 'reselect';

const getMoves = (state) => state.dance.get('moves');

export const getVisibleMoves = createSelector(
	[getMoves],
	(moves) => {
		return moves.filter(move => {
			return move.visible;
		});
	}
);
