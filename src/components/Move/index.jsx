import React from 'react';
import classnames from 'classnames';
import css from './css';

export function Move(props) {
	const moveClass = classnames({
		[css.move]: true,
		[css[props.move.direction]]: true
	});
	const animationDuration = parseInt(props.move.time, 10) - parseInt(props.move.showTime, 10);
	const animationDurationValue = `${animationDuration}ms`;
	const inlineStyle = { animationDuration: animationDurationValue };
	return (
		<div
			className={moveClass}
			style={inlineStyle}
		></div>
	);
}
