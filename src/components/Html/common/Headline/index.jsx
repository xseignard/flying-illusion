import React, { Component } from 'react';
import classnames from 'classnames';
import Texte from '../Texte';
import css from './css';

export default class Headline extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.timeout = setTimeout(() => {
			this.refs.h1.classList.add(css.loaded);
		}, this.props.delay || 20);
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}
	render() {
		const thisClass = classnames({
			[css.h1]: true,
			[css[this.props.direction]]: typeof css[this.props.direction] !== 'undefined',
			[css[this.props.lineNumber]]: true
		});
		return (
			<div ref="h1" className={thisClass}>
				<Texte>{this.props.children}</Texte>
			</div>
		);
	}
}
