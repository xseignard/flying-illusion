import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import dev from './dev';

export const configureStore = () => {
	const middlewares = [thunk];

	dev.addLoggerToMiddlewares(middlewares);

	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
	const store = createStoreWithMiddleware(rootReducer);

	dev.replaceReducerOnHotReload(store);

	return store;
};
