import React, { Component } from 'react';
import classnames from 'classnames';
import css from './css';

export default class Text extends Component {
	render() {
		const thisClass = classnames({
			[css.shade]: true,
			[this.props.className]: true
		});
		return (
			<div className={thisClass}>
				<div>{this.props.children}</div>
				<div>{this.props.children}</div>
			</div>
		);
	}
}
