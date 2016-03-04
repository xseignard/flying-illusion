import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classnames from 'classnames';
import { translateShooter } from './animate';
import css from './css';

export class Shooter extends Component {
	constructor(props) {
		super(props);
		this.onPadDown = this.onPadDown.bind(this);
		this.controls = this.props.controls[this.props.focusIndex];
	}
	componentWillReceiveProps(nextProps) {
		this.controls = this.props.controls[nextProps.focusIndex];
	}
	componentDidUpdate(prevProps) {
		if (this.props.focusIndex !== prevProps.focusIndex) {
			translateShooter(
				this.refs.shooter,
				prevProps.focusIndex,
				this.props.focusIndex
			);
		}
		else {
			this.controls.forEach((direction) => {
				if (
					this.props.pads.get(direction) === 'down' &&
					this.props.pads.get(direction) !== prevProps.pads.get(direction)
				) {
					setTimeout(() => {
						this.onPadDown(direction);
					}, 0);
				}
			});
		}
	}
	onPadDown(direction) {
		clearTimeout(this.timeout);
		if (this.refs[direction]) {
			this.refs[direction].classList.add(css.onPadDown);
			this.timeout = setTimeout(() => {
				this.refs[direction].classList.remove(css.onPadDown);
			}, 200);
		}
	}
	render() {
		const controlsContent = this.controls.map((direction) => {
			return (
				<div
					key={direction}
					ref={direction}
					className={css[`control_${direction}`]}
				></div>
			);
		});
		return (
			<div ref="shooter" className={css.shooter}>
				{controlsContent}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pads: state.pads,
	};
};

export default connect(mapStateToProps)(Shooter);
