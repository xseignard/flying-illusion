import React, { Component } from 'react';
import css from './css';

export default class Headline extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		setTimeout(() => {
			this.refs.headline.classList.remove(css.loaded);
			setTimeout(() => {
				this.refs.headline.classList.add(css.loaded);
			}, 100);
		}, 0);
	}
	render() {
		return (
			<div
				ref="headline"
				className={css.headline}
			>
				<h1>{this.props.line1}</h1>
				<h1>{this.props.line2}</h1>
			</div>
		);
	}
}
