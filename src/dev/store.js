import createLogger from 'redux-logger';

export const addLoggerToMiddlewares = (middlewares, predicate) => {
	if (process.env.NODE_ENV === 'development') {
		const logger = createLogger({ collapsed: true, predicate });
		middlewares.push(logger);
	}
};
