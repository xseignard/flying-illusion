import C from '../constants';

export const scaleBody = () => {
	const scaleThisBody = () => {
		const ratio = Math.min(
			window.innerWidth / C.APP_WIDTH,
			window.innerHeight / C.APP_HEIGHT
		);
		document.body.style.transform = `scale(${ratio})`;
	};
	if (document) {
		window.addEventListener('resize', scaleThisBody);
	}
	scaleThisBody();
};
