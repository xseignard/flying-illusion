import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import dev from './dev';
import { store } from './stores/master';
import { universalSlave, onSlaveMessage } from './threads/master';
import { initKeyboard } from './utils/keyboard';
import App from './components/App';
import './global';

universalSlave.addEventListener('message', onSlaveMessage);

if (typeof window.electron !== 'undefined') {
	window.electron.ipcRenderer.on('message', (event, data) => {
		onSlaveMessage({ data });
	});
}

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
