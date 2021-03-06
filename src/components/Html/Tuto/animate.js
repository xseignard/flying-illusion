export const animateReady = ready => {
	ready.animate([
		{ transform: 'translateX(-1920px)' },
		{ transform: 'translateX(1920px)' },
	], {
		delay: 0,
		duration: 4000,
		easing: 'cubic-bezier(0,.9,1,.1)'
	});
};

export const animateRule = rule => {
	rule.animate([
		{ transform: 'translateX(1920px)' },
		{ transform: 'translateX(-1920px)' },
	], {
		delay: 0,
		duration: 4000,
		easing: 'cubic-bezier(0,.9,1,.1)'
	});
};


export const animateRule2 = rule => {
	rule.animate([
		{ transform: 'translateY(50px)' },
		{ transform: 'translateY(0)' },
	], {
		delay: 4500,
		duration: 8000,
		easing: 'linear'
	});
	rule.animate([
		{ opacity: 0.4 },
		{ opacity: 0.7 },
		{ opacity: 1 },
		{ opacity: 1 },
		{ opacity: 0.4 },
	], {
		delay: 4500,
		duration: 8000,
		easing: 'linear'
	});
};

export const animateRule3 = rule => {
	rule.animate([
		{ transform: 'translateY(50px)' },
		{ transform: 'translateY(0)' },
	], {
		delay: 4500,
		duration: 8000,
		easing: 'linear'
	});
	rule.animate([
		{ opacity: 0.4 },
		{ opacity: 0.7 },
		{ opacity: 1 },
		{ opacity: 1 },
		{ opacity: 0.4 },
	], {
		delay: 4500,
		duration: 8000,
		easing: 'linear'
	});
};
