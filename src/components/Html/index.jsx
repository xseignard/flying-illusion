import React, { Component } from 'react';
import Header from './Header';
import Performance from './Performance';
import css from './css';

export default class Html extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={css.html}>
				<Header
					game={this.props.game}
					startGame={this.props.startGame}
				/>
				<Performance />
			</div>
		);
	}
}
