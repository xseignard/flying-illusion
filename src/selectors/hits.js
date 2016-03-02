import { createSelector } from 'reselect';

const getCommentableMoves = (moves) => {
	return moves.filter(move => {
		return move.commentable === true;
	});
};

const getCommentedMoves = (moves) => {
	return moves.filter(event => {
		return typeof event.comment === 'string';
	});
};

const previousHits = {
	good: 0,
	bad: 0
};
let count = 0;

const shouldShowHits = (commentedMoves, status) => {
	let showHits = false;
	if (status === 'tuto') {
		count = 0;
		showHits = true;
	}
	else {
		const badHits = commentedMoves.filter((move) => {
			return (
				move.comment === 'fail' ||
				move.comment === 'miss'
			);
		}).size;
		const goodHits = commentedMoves.filter((move) => {
			return (
				move.comment === 'ok' ||
				move.comment === 'good' ||
				move.comment === 'excellent'
			);
		}).size;
		if (
			badHits > previousHits.bad &&
			goodHits === previousHits.good
		) {
			count++;
		}
		else if (goodHits > previousHits.good) {
			count = 0;
		}
		previousHits.good = goodHits;
		previousHits.bad = badHits;
		showHits = count >= 5 ? true : false;
	}
	return showHits;
};

const directionHasCommentableMove = (moves, showHits) => {
	const directions = {
		left: false,
		top: false,
		bottom: false,
		right: false,
		showHits
	};
	moves.forEach(move => {
		directions[move.direction] = true;
	});
	return directions;
};

const getMoves = (state) => state.dance.get('moves');
const getStatus = (state) => state.game.get('status');

export const getHits = createSelector(
	[getMoves, getStatus],
	(moves, status) => {
		const commentableMoves = getCommentableMoves(moves);
		const commentedEvents = getCommentedMoves(moves);
		const showHits = shouldShowHits(commentedEvents, status);
		return directionHasCommentableMove(commentableMoves, showHits);
	}
);
