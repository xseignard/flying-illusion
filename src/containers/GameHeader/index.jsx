import React, { Component } from 'react';
import { Arrow } from '../../components/Arrow';
import css from './css';

export class GameHeader extends Component {
	arrowsList() {
		return this.props.arrows.map((arrow) => {
			return <Arrow key={arrow.id} arrow={arrow} />;
		});
	}
	render() {
		this.arrows = this.arrowsList();
		return (
			<div className={css.gameHeader}>
				<div className={css.arrow}></div>
				<div className={css.arrow}></div>
				<div className={css.arrow}></div>
				<div className={css.arrow}></div>
				<div className={css.arrows}>
					{this.arrows}
				</div>
			</div>
		);
	}
}
