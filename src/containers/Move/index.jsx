import React, { Component } from 'react';
import classnames from 'classnames';
import css from './css';

export class Move extends Component {
	constructor(props) {
		super(props);
		this.duration = this.props.move.time - this.props.move.showTime;
		this.mounted = false;
	}
	componentDidMount() {
		this.mounted = true;
		this.el = this.refs.move;
	}
	componentWillReceiveProps(nextProps) {
		if (
			this.props.move.status === 'idle' &&
			nextProps.move.status === 'show'
		) {
			this.el.animate([
				{ transform: 'translate3d(0, 90vh, 0)' },
				{ transform: 'translate3d(0, 0, 0)' },
			], {
				duration: this.duration,
				easing: 'linear'
			});
		}
	}
	shouldComponentUpdate() {
		return !this.mounted;
	}
	render() {
		const moveClass = classnames({
			[css.move]: true,
			[css[this.props.move.direction]]: true
		});
		return (
			<div
				ref="move"
				className={moveClass}
			></div>
		);
	}
}
