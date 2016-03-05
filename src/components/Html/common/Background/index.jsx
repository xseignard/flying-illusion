import React, { Component } from 'react';
import classnames from 'classnames';
import css from './css';

const colorScaleY = {
	in: [0, 1],
	out: [1, 0],
};

const borderScaleY = {
	in: [0.5, 1],
	out: [1, 0.5],
};

export default class Background extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (this.props.animated) {
			const colorAnimation = this.refs.color.animate([
				{ transform: `scaleY(${colorScaleY[this.props.animated][0]})` },
				{ transform: `scaleY(${colorScaleY[this.props.animated][1]})` },
			], {
				delay: this.props.delay || 0,
				duration: this.props.duration || 600,
				easing: this.props.duration || 'cubic-bezier(0,0,0.32,1)'
			});
			this.refs.border.animate([
				{ transform: `scaleY(${borderScaleY[this.props.animated][0]})` },
				{ transform: `scaleY(${borderScaleY[this.props.animated][1]})` },
			], {
				delay: this.props.delay || 0,
				duration: this.props.duration || 600,
				easing: this.props.duration || 'cubic-bezier(0,0,0.32,1)'
			});
			colorAnimation.onfinish = () => {
				if (!this.refs.background) return;
				if (this.props.animated === 'in') {
					this.refs.background.classList.remove(css.closed);
				}
				else if (this.props.animated === 'out') {
					this.refs.background.classList.add(css.closed);
				}
			};
		}
	}
	render() {
		const thisClass = classnames({
			[css.background]: true,
			[css.closed]: this.props.animated === 'in'
		});
		return (
			<div ref="background" className={thisClass}>
				<div ref="color" className={css.color}></div>
				<div ref="border" className={css.border}></div>
			</div>
		);
	}
}
