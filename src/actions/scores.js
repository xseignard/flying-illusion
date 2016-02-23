import C from '../constants';
import { launchRank } from './game';

export function saveScore(data) {
	return (dispatch, getState) => {
		dispatch({
			type: C.SCORE,
			name: data.name,
			score: data.performance.score
		});
		const serializedScores = JSON.stringify(getState().scores.toArray());
		localStorage.setItem('scores', serializedScores);
		dispatch(launchRank());
	};
}

export function loadScores() {
	return (dispatch, getState) => {
		const parsedScores = JSON.parse(localStorage.getItem('scores'));
		dispatch({
			type: C.SCORES_LOADED,
			scores: parsedScores,
		});
	};
}

export function clearScores() {
	return (dispatch, getState) => {
		localStorage.removeItem('scores');
		dispatch({
			type: C.SCORES_RESET,
		});
	};
}
