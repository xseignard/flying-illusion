import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import dev from './dev';
import { configureStore } from './store-master';
import { listenToSlave } from './utils/utils-master';
import App from './components/App';
import './global';

const store = configureStore();
store.dispatch(listenToSlave());

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
