import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import './global';
import App from './containers/App';

const logger = createLogger({
	collapsed: (getState, action) => {
		return true;
		// return action.type === 'PAD';
	}
});
const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);
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
