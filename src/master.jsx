import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import dev from './dev';
import { store } from './stores/master';
import { setMasterWorld } from './world/master';
import App from './components/App';
import './global';

const slave = new Worker('slave.js');

export const sendToSlave = (message) => {
	slave.postMessage(JSON.stringify(message));
};

export const dispatchToSlave = (action) => {
	const message = { function: 'dispatch', action };
	sendToSlave(message);
};

export const slaveRequestAnimationFrame = () => {
	const message = { function: 'slaveRequestAnimationFrame' };
	sendToSlave(message);
};

export const listenToSlave = () => {
	return (dispatch, getState) => {
		const onSlaveMessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.function === 'setMasterWorld') {
				setMasterWorld(data.world);
			}
			else if (data.function === 'dispatch') {
				const action = Object.assign({}, data.action, { fromSlave: true });
				dispatch(action);
			}
		};
		slave.addEventListener('message', onSlaveMessage);
	};
};

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
dev.installImmutablejsDevtools();
