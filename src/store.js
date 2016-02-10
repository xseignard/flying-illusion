import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

export const configureStore = () => {
	const middlewares = [thunk];

	if (process.env.NODE_ENV === 'development') {
		const logger = createLogger({ collapsed: true });
		middlewares.push(logger);
	}

	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
	const store = createStoreWithMiddleware(rootReducer);

	// https://github.com/rackt/react-redux/releases/tag/v2.0.0
	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};
