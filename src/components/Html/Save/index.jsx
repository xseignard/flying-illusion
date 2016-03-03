import React, { Component } from 'react';
import { connect } from 'react-redux';
import Background from '../common/Background';
import { saveRecord } from '../../../actions/records';
import Letter from './Letter';
import Text from '../common/Text';
import finalCss from '../common/final.css';
import css from './css';

export class Save extends Component {
	constructor(props) {
		super(props);
		this.state = { focusIndex: 0 };
		this.letters = ['A', 'A', 'A'];
		this.onLetter = this.onLetter.bind(this);
		this.onLeft = this.onLeft.bind(this);
		this.onRight = this.onRight.bind(this);
	}
	onLetter(index, letter) {
		this.letters[index] = letter;
	}
	onLeft(index, letter) {
		this.setState({ focusIndex: this.state.focusIndex - 1 });
	}
	onRight(index, letter) {
		if (index < this.letters.length - 1) {
			this.setState({ focusIndex: this.state.focusIndex + 1 });
		}
		else {
			this.props.saveRecord({
				time: this.props.choregraphy.get('time'),
				name: this.props.choregraphy.get('name'),
				player: this.letters.join(''),
				score: this.props.performance.score,
				comments: this.props.performance.comments
			});
		}
	}
	render() {
		const controls = [
			['top', 'bottom', 'right'],
			['left', 'top', 'bottom', 'right'],
			['left', 'top', 'bottom', 'right'],
		];
		const lettersContent = this.letters.map((letter, index) => {
			return (
				<Letter
					key={index}
					index={index}
					focus={this.state.focusIndex === index}
					letter={letter}
					height={150}
					duration={200}
					controls={controls[index]}
					onLetter={this.onLetter}
					onLeft={this.onLeft}
					onRight={this.onRight}
				/>
			);
		});
		return (
			<div className={css.save}>
				<Background />
				<Text className={finalCss.h1}>
					PARTIE FINIE
				</Text>
				<div className={finalCss.score}>
					{this.props.performance.score} POINTS
				</div>
				<div className={css.letters}>
					{lettersContent}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		choregraphy: state.choregraphy,
		performance: state.performance,
	};
};

export default connect(mapStateToProps, { saveRecord })(Save);
