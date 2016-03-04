const getTranslateX = (index) => {
	return `translateX(${index * 301}px)`;
};

export const translateShooter = (shooter, prevIndex, nextIndex) => {
	shooter.style.transform = getTranslateX(nextIndex);
	shooter.animate([
		{ transform: getTranslateX(prevIndex) },
		{ transform: getTranslateX(nextIndex) }
	], {
		duration: 300,
		easing: 'cubic-bezier(0,0,0.32,1)'
	});
};
