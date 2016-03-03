import React, { Component } from 'react';
import css from './css';

export default class Background extends Component {
	render() {
		return (
			<div
				ref="background"
				className={css.background}
			>
			</div>
		);
	}
}
