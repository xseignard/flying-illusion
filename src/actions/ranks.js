import C from '../constants';
import { launchRank } from './game';

export function saveRank(data) {
	return (dispatch, getState) => {
		dispatch({
			type: C.RANK,
			name: data.name,
			score: data.performance.score
		});
		const serializedRanks = JSON.stringify(getState().ranks.toArray());
		localStorage.setItem('ranks', serializedRanks);
		dispatch(launchRank());
	};
}

export function loadRanks() {
	return (dispatch, getState) => {
		const parsedRanks = JSON.parse(localStorage.getItem('ranks'));
		dispatch({
			type: C.RANKS_LOADED,
			ranks: parsedRanks,
		});
	};
}
