import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './css/global';
import App from './components/App/App';
import reducers from './store/reducers';

// create redux store from the reducer
const store = createStore(reducers);

// wrap the top level component inside the react-redux Provider
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
