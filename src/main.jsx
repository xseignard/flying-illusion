import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import C from './constants';
import './global';
import { configureStore } from './store';
import App from './components/App';

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

const scaleBody = () => {
	const ratio = Math.min(
		window.innerWidth / C.APP_WIDTH,
		window.innerHeight / C.APP_HEIGHT
	);
	document.body.style.transform = `scale(${ratio})`;
};
if (document) {
	window.addEventListener('resize', scaleBody);
}
scaleBody();
