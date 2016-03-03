import React, { Component } from 'react';
import css from './css';

export default class lightning extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (this.props.active) {
			this.refs.lightning.animate([
				{ opacity: 0 },
				{ opacity: 0.6 },
				{ opacity: 0 }
			], {
				duration: 200
			});
		}
		return (
			<div ref="lightning" className={css.lightning}></div>
		);
	}

}
