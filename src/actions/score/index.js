import C from '../../constants';
import { getScore } from './helpers';

export const updateScore = () => {
	return (dispatch, getState) => {
		const state = getState();
		dispatch({
			type: C.SCORE,
			value: getScore(state.moves, state.steps)
		});
	};
};
