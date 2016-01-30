const timeouts = [];

export const startChoreography = (steps) => {
	// handling start and end timeouts
	// TODO: update redux state
	const createTimeouts = (step) => {
		const startTimeout = setTimeout(() => {
			console.log('START');
		}, step.startTime);
		timeouts.push(startTimeout);

		const endTimeout = setTimeout(() => {
			console.log('END');
		}, step.endTime);
		timeouts.push(endTimeout);
	};

	steps.forEach(createTimeouts);
};

export const stopChoreography = (choreography) => {
	timeouts.forEach((timeout) => {
		clearTimeout(timeout);
	});
	// TODO: dispatch stopped action?
};
