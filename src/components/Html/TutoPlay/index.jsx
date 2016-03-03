import React, { Component } from 'react';
import Progression from '../common/Progression';
import Hits from '../common/Hits';
import Performance from '../common/Performance';
import Lines from '../common/Lines';
import css from './css';

export default class Rank extends Component {
	render() {
		return (
			<div className={css.tutoPlay}>
				<Hits />
				<Progression />
				<Performance />
				<Lines />
			</div>
		);
	}
}
