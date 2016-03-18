
const isElectron = typeof window !== 'undefined' && typeof window.electron !== 'undefined';

export default {
	PAD: 'PAD',
	PAD_DELAY: isElectron ? 50 : 0
};
