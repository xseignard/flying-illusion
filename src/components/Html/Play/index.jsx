import React, { Component } from 'react';
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
			</div>
		);
	}
}
