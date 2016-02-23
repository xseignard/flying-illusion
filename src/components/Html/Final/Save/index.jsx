import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveScore } from '../../../../actions/scores';
import { getPerformance } from '../../../../selectors/performance';
import Letter from './Letter';
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
			this.props.saveScore({
				name: this.letters.join(''),
				performance: this.props.performance
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
					height={100}
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
				{lettersContent}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		performance: getPerformance(state),
	};
}

export default connect(mapStateToProps, { saveScore })(Save);
