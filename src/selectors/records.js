import { createSelector } from 'reselect';

const getRecords = (state) => state.records;

export const getSortedRecords = createSelector(
	[getRecords],
	(records) => {
		return records.sort((record1, record2) => {
			return record1.score < record2.score;
		});
	}
);
