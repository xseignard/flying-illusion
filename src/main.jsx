import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './global';
import { configureStore } from './store';
import App from './containers/App';

const store = configureStore();

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
