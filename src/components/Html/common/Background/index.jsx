import React, { Component } from 'react';
import css from './css';

export default class Background extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (this.props.animated) {
			this.refs.color.animate([
				{ transform: 'scaleY(0)' },
				{ transform: 'scaleY(1)' }
			], {
				duration: 600,
				easing: 'cubic-bezier(0,0,0.32,1)'
			});
			this.refs.border.animate([
				{ transform: 'scaleY(0.5)' },
				{ transform: 'scaleY(1)' }
			], {
				duration: 600,
				easing: 'cubic-bezier(0,0,0.32,1)'
			});
		}
	}
	render() {
		return (
			<div className={css.background}>
				<div ref="color" className={css.color}></div>
				<div ref="border" className={css.border}></div>
			</div>
		);
	}
}
