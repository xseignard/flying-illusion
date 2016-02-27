import { configureStore } from './store-slave';
import { setMovesTimeouts, stopMoves } from './actions/moves-slave';

const store = configureStore();
const dispatch = store.dispatch;
self.addEventListener('message', (event) => {
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
});
