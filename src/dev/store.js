import createLogger from 'redux-logger';

export const addLoggerToMiddlewares = (middlewares) => {
	if (process.env.NODE_ENV === 'development') {
		const logger = createLogger({ collapsed: true });
		middlewares.push(logger);
	}
};