import React, { Component } from 'react';
import Text from '../Text';
import css from './css';

export default class Headline extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.refs.h1.classList.remove(css.loaded);
		setTimeout(() => {
			this.refs.h1.classList.add(css.loaded);
		}, 100);
	}
	render() {
		return (
			<div
				ref="h1"
				className={css.h1}
			>
				<Text
					text={this.props.line1}
					className={css.line1}
				/>
				<Text
					text={this.props.line2}
					className={css.line2}
				/>
			</div>
		);
	}
}
