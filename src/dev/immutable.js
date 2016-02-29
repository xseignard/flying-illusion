export const installImmutablejsDevtools = () => {
	if (process.env.NODE_ENV === 'development') {
		require('immutablejs-devtools').install();
	}
};
