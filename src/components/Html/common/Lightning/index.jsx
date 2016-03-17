import React, { Component } from 'react';
import css from './css';

export default class Lightning extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.refs.lightning.animate([
			{ opacity: 0 },
			{ opacity: 0.7 },
			{ opacity: 1 },
			{ opacity: 1 },
			{ opacity: 0 }
		], {
			duration: 2000,
			easing: 'cubic-bezier(0,0,0.32,1)'
		});
	}
	render() {
		return (
			<div ref="lightning" className={css.lightning}></div>
		);
	}
}
