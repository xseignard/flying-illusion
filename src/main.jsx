import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import './global';
import App from './containers/App';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger({ collapsed: true });
	middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const rootElement = document.querySelector('.root');
const renderApp = () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>,
		rootElement
	);
};
renderApp();

// Development hot reloading
if (module.hot) {
	module.hot.accept();
}
