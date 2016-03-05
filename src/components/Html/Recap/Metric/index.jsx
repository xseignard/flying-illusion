import React, { Component } from 'react';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-minimal';
import Texte from '../../common/Texte';
import css from './css';

export class Metric extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.refs.bar.animate([
			{ transform: 'scaleX(0)' },
			{ transform: 'scaleX(1)' }
		], {
			duration: 2000,
			easing: 'cubic-bezier(0,0,0.32,1)'
		});
		const odometer = new Odometer({
			el: this.refs.valueHolder,
			value: 0
		});
		odometer.update(this.props.value);
	}
	render() {
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
				<div ref="valueHolder" className={css.value}>
					0
				</div>
			</div>
		);
	}
}
