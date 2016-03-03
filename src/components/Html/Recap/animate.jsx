import css from './css';

export const animateH1 = (h1) => {
	const loadAnimation = h1.animate([
		{	transform: 'translate3d(-100px, 0, 0)' },
		{ transform: 'translate3d(0, 0, 0)' },
	], {
		delay: 400,
		duration: 1000,
		easing: 'ease-out'
	});
	h1.animate([{	opacity: 0.3 }, { opacity: 1 }], {
		delay: 400,
		duration: 1000,
		easing: 'ease-out'
	});
	loadAnimation.onfinish = () => {
		h1.classList.add(css.loaded);
	};
};

export const animateScore = (score) => {
	const animation = score.animate([
		{	transform: 'translate3d(-50px, 0, 0)' },
		{ transform: 'translate3d(0, 0, 0)' },
	], {
		delay: 0,
		duration: 1400,
		easing: 'ease-out'
	});
	animation.onfinish = () => {
		score.classList.add(css.loaded);
	};
};

export const animateMetrics = (metrics) => {
	const animation = metrics.animate([
		{	transform: 'translate3d(100px, 0, 0)' },
		{ transform: 'translate3d(0, 0, 0)' },
	], {
		delay: 0,
		duration: 1400,
		easing: 'ease-out'
	});
	metrics.animate([{	opacity: 0.3 }, { opacity: 1 }], {
		duration: 1400,
		easing: 'ease-out'
	});
	animation.onfinish = () => {
		metrics.classList.add(css.loaded);
	};
};
