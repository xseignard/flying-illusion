import { createSelector } from 'reselect';

const getChoregraphy = (state) => state.choregraphy;

export const getShowMoves = createSelector(
	[getChoregraphy],
	(moves) => {
		return moves.filter(move => {
			return (
				move.status === 'show' ||
				move.status === 'hittable'
			);
		});
	}
);
