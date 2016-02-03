import React from 'react';
import classnames from 'classnames';
import css from './css';

export function Arrow(props) {
	const arrowClass = classnames({
		[css.arrow]: true,
		[css[props.arrow.direction]]: true
	});
	const duration = props.arrow.time - props.arrow.showTime;
	const animationDurationValue = `${duration}ms`;
	const inlineStyle = { animationDuration: animationDurationValue };
	return (
		<div
			className={arrowClass}
			style={inlineStyle}
		></div>
	);
}
