export const world = {
	moves: {},
	targets: {
		left: {},
		top: {},
		bottom: {},
		right: {},
	}
};

export const setMasterWorld = (slaveWorld) => {
	Object.assign(world, slaveWorld);
};
