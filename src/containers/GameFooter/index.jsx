import React, { Component } from 'react';
import css from './css';

export class GameFooter extends Component {
	render() {
		return (
			<div className={css.gameFooter}>
				<div className={css.score}>
					<div className={css.label}>score</div>
					<div className={css.amount}>{this.props.score}</div>
				</div>
				<div className={css.bonus}>
					<div className={css.label}>combo</div>
					<div className={css.amount}>X100</div>
				</div>
			</div>
		);
	}
}
