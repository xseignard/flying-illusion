import React, { Component } from 'react';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-minimal';
import classnames from 'classnames';
import Texte from '../../common/Texte';
import css from './css';

export class Metric extends Component {
	constructor(props) {
		super(props);
		this.animateOdometer = this.animateOdometer.bind(this);
	}
	componentDidMount() {
		const animation = this.refs.bar.animate([
			{ transform: 'scaleX(0)' },
			{ transform: 'scaleX(1)' }
		], {
			delay: 1400,
			duration: 1000,
			easing: 'cubic-bezier(0,0,0.32,1)'
		});
		animation.onfinish = () => {
			if (!this.refs.bar) return;
			this.refs.bar.classList.add(css.loaded);
		};
		this.timeout = setTimeout(this.animateOdometer, 1400);
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}
	animateOdometer() {
		const odometer = new Odometer({
			el: this.refs.valueHolder,
			value: 0
		});
		odometer.update(100);
	}
	render() {
		const valueClass = classnames({
			[css.value]: true,
			[css.prefix]: this.props.prefix
		});
		const width = this.props.value / this.props.maxValue * 100;
		const inlineStyle = { width: `${width}%` };
		return (
			<div className={css.metric}>
				<div>
					<Texte className={css.label}>
						{this.props.label}
					</Texte>
				</div>
				<div className={css.scale}>
					<div ref="bar" className={css.bar} style={inlineStyle} />
				</div>
				<div ref="valueHolder" className={valueClass}></div>
			</div>
		);
	}
}
