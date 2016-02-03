import { createSelector } from 'reselect';

const getChoregraphy = (state) => state.choregraphy;

export const getArrows = createSelector(
	[getChoregraphy],
	(moves) => {
		return moves.filter((move) => {
			return (move.status.match(/show|play/));
		});
	}
);
