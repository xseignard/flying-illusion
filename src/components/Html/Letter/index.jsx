import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { alphabet, getItemByInfiniteIndex } from '../../../utils';
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
		this.allLettersStyle = { transform: getCurrentTransform(this.props.height) };
		this.changeLetter = this.changeLetter.bind(this);
	}
	shouldComponentUpdate() {
		return this.props.focus;
	}
	componentDidUpdate(prevProps) {
		['top', 'bottom', 'right'].forEach((direction) => {
			if (
				this.props.focus &&
				this.props.pads.get(direction) === 'down' &&
				this.props.pads.get(direction) !== prevProps.pads.get(direction)
			) {
				switch (direction) {
					case 'top':
						this.changeLetter(-1);
						break;
					case 'bottom':
						this.changeLetter(1);
						break;
					case 'right':
						setTimeout(() => {
							this.props.onSelection(this.props.index, this.state.letter);
						}, 0);
						break;
					default:
				}
			}
		});
	}
	changeLetter(increment) {
		this.animation = this.refs.letter.animate([
			{ transform: getCurrentTransform(this.props.height) },
			{ transform: getNextTransform(this.props.height, increment) }
		], {
			duration: this.props.duration,
		});
		this.animation.onfinish = () => {
			const thisIndex = alphabet.indexOf(this.state.letter);
			const letter = getItemByInfiniteIndex(alphabet, thisIndex + increment);
			this.setState({ letter });
		};
	}
	render() {
		const letterClass = classnames({
			[css.letter]: true,
			[css.focus]: this.props.focus
		});
		const lettersContent = [-2, -1, 0, 1, 2].map((index) => {
			const thisIndex = alphabet.indexOf(this.state.letter) + index;
			return (
				<div key={index}>
					{getItemByInfiniteIndex(alphabet, thisIndex)}
				</div>
			);
		});
		return (
			<div className={letterClass}>
				<div className={css.visibleLetters}>
					<div
						ref="letter"
						className={css.allLetters}
						style={this.allLettersStyle}
					>
						{lettersContent}
					</div>
				</div>
				<div
					className={css.previousLetter}
					onClick={this.previousLetter}
				></div>
				<div
					className={css.nextLetter}
					onClick={this.nextLetter}
				></div>
				<div
					className={css.onSelection}
					onClick={this.onSelection}
				></div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		pads: state.pads,
	};
}

export default connect(mapStateToProps)(Letter);
