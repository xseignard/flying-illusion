import React, { Component } from 'react';
import Performance from '../Performance';
import Progression from '../Progression';
import Hits from '../Hits';
import css from './css';

export default class Game extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div className={css.game}>
				<Progression />
				<Performance />
				<Hits />
			</div>
		);
	}
}
