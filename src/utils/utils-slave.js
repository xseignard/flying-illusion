import { setMovesTimeouts, stopMoves } from '../actions/moves';

export const listenToMaster = (action) => {
	return (dispatch, getState) => {
		const onMasterMessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.function === 'dispatch') {
				dispatch(data.action);
			}
			else if (data.function === 'setMovesTimeouts') {
				dispatch(setMovesTimeouts(data.forward));
			}
			else if (data.function === 'stopMoves') {
				dispatch(stopMoves());
			}
		};
		self.addEventListener('message', onMasterMessage);
	};
};

export const sendToMaster = (message) => {
	self.postMessage(JSON.stringify(message));
};

export const dispatchToMaster = (action) => {
	const message = { function: 'dispatch', action };
	sendToMaster(message);
};
