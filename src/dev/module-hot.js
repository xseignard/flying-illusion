export const moduleHotAccept = (middlewares) => {
	if (module.hot) {
		module.hot.accept();
	}
};

// https://github.com/rackt/react-redux/releases/tag/v2.0.0
export const replaceReducerOnHotReload = (store) => {
	if (process.env.NODE_ENV === 'development') {
		if (module.hot) {
			module.hot.accept('../stores/reducers', () => {
				const nextRootReducer = require('../stores/reducers/index');
				store.replaceReducer(nextRootReducer);
			});
		}
	}
};
