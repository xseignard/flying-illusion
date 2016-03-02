import { createSelector } from 'reselect';

const getCommentableMoves = (moves) => {
	return moves.filter(move => {
		return move.commentable === true;
	});
};

const directionHasCommentableMove = (moves) => {
	const directions = {
		left: false,
		top: false,
		bottom: false,
		right: false,
	};
	moves.forEach(move => {
		directions[move.direction] = true;
	});
	return directions;
};

const getMoves = (state) => state.dance.get('moves');

export const getHits = createSelector(
	[getMoves],
	(moves) => {
		const commentableMoves = getCommentableMoves(moves);
		return directionHasCommentableMove(commentableMoves);
	}
);
