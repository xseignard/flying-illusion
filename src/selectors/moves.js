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

export const getMaximumProgression = createSelector(
	[getMoves],
	(moves) => {
		return moves.size * 4;
	}
);

export const getMaximumComments = createSelector(
	[getMoves],
	(moves) => {
		return moves.size;
	}
);
