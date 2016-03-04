import React, { Component } from 'react';
import Progression from '../common/Progression';
import Hits from '../common/Hits';
import Performance from '../common/Performance';
import Lines from '../common/Lines';
import Lightning from '../common/Lightning';
import css from './css';


export default class Rank extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={css.play}>
				<Lightning />
				<Hits />
				<Progression />
				<Performance />
				<Lines />
			</div>
		);
	}
}
