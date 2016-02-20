import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './global';
import { configureStore } from './store';
import App from './components/App';
import dev from './dev';

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

dev.moduleHotAccept();
dev.scaleBody();
