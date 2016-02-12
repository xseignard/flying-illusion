import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Stats from 'stats.js';
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

// adds a stats.js fps counter
const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
const update = () => {
	stats.update();
	requestAnimationFrame(update);
};
requestAnimationFrame(update);

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
