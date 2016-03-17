import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import css from './css';
import circle from '../../../../../www/img/circle.svg';

export default class Circle extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.timeout = setTimeout(() => {
			this.refs.h1.classList.add(css.loaded);
		}, this.props.delay || 20);
	}
	componentDidMount() {
		const whiteCircle = findDOMNode(this).querySelectorAll('svg path')[1];
		whiteCircle.animate([
			{ transform: 'rotate(0deg)' },
			{ transform: 'rotate(360deg)' }
		], {
			duration: 2000,
			easing: 'linear',
			iterations: Infinity
		});
		whiteCircle.animate([
			{ 'stroke-dashoffset': 150 },
			{ 'stroke-dashoffset': 10 },
			{ 'stroke-dashoffset': 150 }
		], {
			duration: 2000,
			easing: 'linear',
			iterations: Infinity
		});
		this.timeout = setTimeout(() => {
			this.refs.circleContainer.classList.add(css.loaded);
		}, 400);
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}
	render() {
		return (
			<div ref="circleContainer"
				className={css.circle}
				dangerouslySetInnerHTML={{ __html: circle }}
			/>
		);
	}
}
