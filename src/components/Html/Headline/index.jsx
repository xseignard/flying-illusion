import React, { Component } from 'react';
import classnames from 'classnames';
import Text from '../Text';
import css from './css';

export default class Headline extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.refs.h1.classList.remove(css.loaded);
		this.timeout = setTimeout(() => {
			this.refs.h1.classList.add(css.loaded);
		}, 100);
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}
	render() {
		const thisClass = classnames({
			[css.h1]: true,
			[css[this.props.lineNumber]]: true
		});
		return (
			<div ref="h1" className={thisClass}>
				<Text>{this.props.children}</Text>
			</div>
		);
	}
}
