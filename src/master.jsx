import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import dev from './dev';
import { store } from './stores/master';
import { universalSlave, onSlaveMessage } from './utils/master';
import { initKeyboard } from './utils/keyboard';
import App from './components/App';
import './global';

universalSlave.addEventListener('message', onSlaveMessage);

initKeyboard();

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
dev.installImmutablejsDevtools();
