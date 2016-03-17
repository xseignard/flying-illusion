import React, { Component } from 'react';
import css from './css';
import circle from '../../../../../www/img/circle.svg';

export default class Circle extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// this.refs.circle.animate([
		// 	{ opacity: 0 },
		// 	{ opacity: 0.7 },
		// 	{ opacity: 1 },
		// 	{ opacity: 1 },
		// 	{ opacity: 0 }
		// ], {
		// 	duration: 2000,
		// 	easing: 'cubic-bezier(0,0,0.32,1)'
		// });
	}
	render() {
		return (
			<div className={css.circle}>
				<img ref="circle" src={circle} />
			</div>
		);
	}
}
