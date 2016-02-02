import React, { Component } from 'react';
import { Move } from '../../components/Move';
import css from './css';

export class GameHeader extends Component {
	movesList() {
		return this.props.moves.map((move) => {
			return <Move key={move.id} move={move} />;
		});
	}
	render() {
		this.moves = this.movesList();
		return (
			<div className={css.gameHeader}>
				<div className={css.arrow}></div>
				<div className={css.arrow}></div>
				<div className={css.arrow}></div>
				<div className={css.arrow}></div>
				<div className={css.moves}>
					{this.moves}
				</div>
			</div>
		);
	}
}
