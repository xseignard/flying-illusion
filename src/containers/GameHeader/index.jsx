import React, { Component } from 'react';
import { Move } from '../Move';
import css from './css';

export class GameHeader extends Component {
	movesList() {
		return this.props.choregraphy.map((move, index) => {
			return <Move key={index} move={move} />;
		});
	}
	render() {
		this.moves = this.movesList();
		return (
			<div className={css.gameHeader}>
				<div className={css.direction}></div>
				<div className={css.direction}></div>
				<div className={css.direction}></div>
				<div className={css.direction}></div>
				<div className={css.moves}>
					{this.moves}
				</div>
			</div>
		);
	}
}
