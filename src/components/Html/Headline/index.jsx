import React, { Component } from 'react';
import classnames from 'classnames';
import Text from '../Text';
import css from './css';

export default class Headline extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const methods = this.props.direction === 'in' ? ['add', 'remove'] : ['remove', 'add'];
		this.refs.h1.classList[methods[0]](css.loaded);
		this.timeout = setTimeout(() => {
			this.refs.h1.classList[methods[0]](css.loaded);
		}, 100);
	}
	componentWillReceiveProps(nextProps) {
		if (
			nextProps.display && this.props.display) {
			this.refs.h1.classList.remove(css.loaded);
		}
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
