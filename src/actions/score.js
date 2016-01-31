import C from '../constants';

// const myTargetSteps = [
// 	{
// 		direction: 'left',
// 		time: 2000
// 	},
// 	{
// 		direction: 'left',
// 		time: 4000
// 	},
// 	{
// 		direction: 'left',
// 		time: 6000
// 	},
// 	{
// 		direction: 'left',
// 		time: 8000
// 	}
// ];
//
// const myPlayerSteps = [
// 	{
// 		direction: 'left',
// 		time: 2000
// 	},
// 	{
// 		direction: 'left',
// 		time: 3000
// 	},
// 	{
// 		direction: 'left',
// 		time: 5500
// 	},
// 	{
// 		direction: 'left',
// 		time: 9000
// 	}
// ];
//
const getScore = (targetSteps, playerSteps) => {
	return 1000;
	// const targetStepsCopy = targetSteps.concat([]);
	// const stepsScores = [];
	// let totalScore = new Number();
	// playerSteps.forEach((step) => {
	// 	let index;
	// 	for (index = 0; index < playerSteps.length; index++) {
	// 	}
	// });
};

export const updateScore = () => {
	return (dispatch, getState) => {
		const state = getState();
		dispatch({
			type: C.SCORE,
			value: getScore(state.targetSteps, state.playerSteps)
		});
	};
};
