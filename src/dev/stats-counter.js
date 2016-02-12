import Stats from 'stats.js';

export const addStatsCounter = () => {
	const stats = new Stats();
	Object.assign(stats.domElement.style, {
		position: 'absolute',
		left: '0px',
		top: '0px',
	});
	document.body.appendChild(stats.domElement);
	const update = () => {
		stats.update();
		requestAnimationFrame(update);
	};
	requestAnimationFrame(update);
};
