export const animateReady = ready => {
	ready.animate([
		{ transform: 'translateX(0)' },
		{ transform: 'translateX(1920px)' },
	], {
		delay: 1000,
		duration: 3000,
		easing: 'cubic-bezier(0, 1, 1, .5)'
	});
};

export const animateRules = rules => {
	rules.animate([
		{ transform: 'translateX(0)' },
		{ transform: 'translateX(-1920px)' },
	], {
		delay: 1000,
		duration: 3000,
		easing: 'cubic-bezier(0, 1, 1, .5)'
	});
};
