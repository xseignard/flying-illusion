import React from 'react';
import classnames from 'classnames';
import css from './css';

export function TargetStep(props) {
	const stepClass = classnames({
		[css.choregraphyStep]: true,
		[css[props.step.direction]]: true
	});
	const animationDuration = `${parseInt(props.step.end, 10) - parseInt(props.step.start, 10)}ms`;
	const inlineStyle = { animationDuration };
	return (
		<div
			className={stepClass}
			style={inlineStyle}
		></div>
	);
}
