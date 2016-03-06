const isElectron = typeof window !== 'undefined' && typeof window.electron !== 'undefined';

export default {
	GAME_ASSETS_DURATION: isElectron ? 3000 : 10000,
	ASSETS_WEBGL_RENDER_TIME: isElectron ? 1000 : 8000,
};
