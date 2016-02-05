import React, { Component } from 'react';
import classnames from 'classnames';
import GSAP from 'gsap';
import css from './css';

export class Move extends Component {
	constructor(props) {
		super(props);
		this.duration = (this.props.move.time - this.props.move.showTime) / 1000;
	}
	componentDidMount() {
		this.el = this.refs.move;
	}
	componentDidUpdate(prevProps) {
		if (
			prevProps.move.status === 'idle' &&
			this.props.move.status === 'show'
		) {
			GSAP.to(this.el, this.duration, { top: 0 });
		}
	}
	render() {
		const moveClass = classnames({
			[css.move]: true,
			[css[this.props.move.direction]]: true,
			[css[this.props.move.status]]: true,
		});
		return (
			<div
				ref="move"
				className={moveClass}
			></div>
		);
	}
}
