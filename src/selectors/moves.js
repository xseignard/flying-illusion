import { createSelector } from 'reselect';

const getMoves = (state) => state.moves;

export const getShowMoves = createSelector(
	[getMoves],
	(moves) => {
		return moves.filter(move => {
			return (
				move.status === 'show' ||
				move.status === 'hittable'
			);
		});
	}
);
