import React, { Component } from 'react';
import classnames from 'classnames';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-minimal';
import Texte from '../../common/Texte';
import css from './css';

export class Metric extends Component {
	constructor(props) {
		super(props);
		this.animateOdometer = this.animateOdometer.bind(this);
	}
	componentDidMount() {
		if (this.props.animated) {
			const animation = this.refs.bar.animate([
				{ transform: 'scaleX(0)' },
				{ transform: 'scaleX(1)' }
			], {
				delay: 1600,
				duration: 1000,
				easing: 'cubic-bezier(0,0,0.32,1)'
			});
			animation.onfinish = () => {
				if (!this.refs.bar) return;
				this.refs.bar.classList.add(css.loaded);
			};
			this.timeout = setTimeout(this.animateOdometer, 1600);
		}
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}
	animateOdometer() {
		const odometer = new Odometer({
			el: this.refs.valueHolder,
			value: 0
		});
		odometer.update(this.props.value);
	}
	render() {
		const width = this.props.value / this.props.maxValue * 100;
		const barClass = classnames({
			[css.bar]: true,
			[css.animated]: this.props.animated
		});
		const inlineStyle = { width: `${width}%` };
		return (
			<div className={css.metric}>
				<div>
					<Texte className={css.label}>
						{this.props.label}
					</Texte>
				</div>
				<div className={css.scale}>
					<div ref="bar" className={barClass} style={inlineStyle} />
				</div>
				<div ref="valueHolder" className={css.value}></div>
			</div>
		);
	}
}
