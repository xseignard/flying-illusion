import C from '../constants';
import { launchRank } from './game';
import { resetChoregraphy } from './choregraphy';
export function saveRecord(data) {
	return (dispatch, getState) => {
		dispatch({
			type: C.RECORD,
			time: data.time,
			name: data.name,
			player: data.player,
			score: data.score,
			comments: data.comments
		});
		const serializedRecords = JSON.stringify(getState().records.toArray());
		localStorage.setItem('records', serializedRecords);
		dispatch(resetChoregraphy());
		dispatch(launchRank());
	};
}

export function loadRecords() {
	return (dispatch, getState) => {
		const parsedRecords = JSON.parse(localStorage.getItem('records'));
		dispatch({
			type: C.RECORDS_LOADED,
			records: parsedRecords,
		});
	};
}

export function clearRecords() {
	return (dispatch, getState) => {
		localStorage.removeItem('records');
		dispatch({
			type: C.RECORDS_RESET,
		});
	};
}
