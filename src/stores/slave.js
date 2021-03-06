import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { dispatchToMaster } from '../threads/slave';
import dev from '../dev';

const predicate = (getState, action) => {
	return action.log;
};

export const configureStore = (thread) => {
	const masterMiddleware = store => next => action => {
		if (!action.fromMaster && !action.hideFromMaster) dispatchToMaster(action);
		return next(action);
	};
	const middlewares = [thunk, masterMiddleware];
	dev.addLoggerToMiddlewares(middlewares, predicate);
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
	const store = createStoreWithMiddleware(rootReducer);

	dev.replaceReducerOnHotReload(store);

	return store;
};

export const store = configureStore();
