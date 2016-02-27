import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { sendToSlave } from './utils/utils-master';
import dev from './dev';

export const configureStore = () => {
	const slaveMiddleware = store => next => action => {
		store.dispatch(sendToSlave({
			function: 'dispatch',
			action
		}));
		return next(action);
	};
	const middlewares = [thunk, slaveMiddleware];

	dev.addLoggerToMiddlewares(middlewares);

	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
	const store = createStoreWithMiddleware(rootReducer);

	dev.replaceReducerOnHotReload(store);

	return store;
};
