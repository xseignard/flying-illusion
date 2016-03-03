import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import U from '../../../../utils';
import css from './css';

const getCurrentTransform = (height) => {
	const currentTranslationY = height * -1.5;
	return `translateY(${currentTranslationY}px)`;
};

const getNextTransform = (height, increment) => {
	const nextTranslationY = height * (-1.5 - increment);
	return `translateY(${nextTranslationY}px)`;
};

export class Letter extends Component {
	constructor(props) {
		super(props);
		this.state = { letter: this.props.letter };
		this.inlineStyle = { transform: getCurrentTransform(this.props.height) };
		this.onPadDown = this.onPadDown.bind(this);
		this.changeLetter = this.changeLetter.bind(this);
	}
	shouldComponentUpdate() {
		return this.props.focus;
	}
	componentDidUpdate(prevProps) {
		this.props.controls.forEach((direction) => {
			if (
				this.props.focus &&
				this.props.pads.get(direction) === 'down' &&
				this.props.pads.get(direction) !== prevProps.pads.get(direction)
			) {
				setTimeout(() => {
					this.onPadDown(direction);
				}, 0);
			}
		});
	}
	onPadDown(direction) {
		if (direction === 'left') {
			this.props.onLeft(this.props.index);
		}
		else if (direction === 'right') {
			this.props.onRight(this.props.index);
		}
		else {
			this.changeLetter(direction);
		}
	}
	changeLetter(direction) {
		const increment = direction === 'top' ? -1 : 1;
		this.refs[direction].classList.add(css.onPadDown);
		this.animation = this.refs.letter.animate([
			{ transform: getCurrentTransform(this.props.height) },
			{ transform: getNextTransform(this.props.height, increment) }
		], {
			duration: this.props.duration,
		});
		this.animation.onfinish = () => {
			this.refs[direction].classList.remove(css.onPadDown);
			const thisIndex = U.alphabet.indexOf(this.state.letter);
			const letter = U.getItemByInfiniteIndex(U.alphabet, thisIndex + increment);
			this.setState({ letter });
			this.props.onLetter(this.props.index, this.state.letter);
		};
	}
	render() {
		const letterClass = classnames({
			[css.letter]: true,
			[css.focus]: this.props.focus
		});
		const lettersContent = [-2, -1, 0, 1, 2].map((index) => {
			const thisIndex = U.alphabet.indexOf(this.state.letter) + index;
			const thisClass = index === 0 ? css.activeLetter : null;
			return (
				<div key={index} className={thisClass}>
					{U.getItemByInfiniteIndex(U.alphabet, thisIndex)}
				</div>
			);
		});
		const controlsContent = this.props.controls.map((direction) => {
			return (
				<div
					key={direction}
					ref={direction}
					className={css[`control_${direction}`]}
				></div>
			);
		});
		return (
			<div className={letterClass}>
				<div className={css.visibleLetters}>
					<div
						ref="letter"
						className={css.allLetters}
						style={this.inlineStyle}
					>
						{lettersContent}
					</div>
				</div>
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

export default connect(mapStateToProps)(Letter);
