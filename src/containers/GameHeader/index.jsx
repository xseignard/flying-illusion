import React, { Component } from 'react';
import css from './css';

export default class GameHeader extends Component {
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<div className={css.gameHeader}>
				<div className={css.direction}></div>
				<div className={css.direction}></div>
				<div className={css.direction}></div>
				<div className={css.direction}></div>
			</div>
		);
	}
}
