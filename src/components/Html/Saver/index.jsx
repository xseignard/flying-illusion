import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveRank } from '../../../actions/ranks';
import { getPerformance } from '../../../selectors/performance';
import Letter from '../Letter';
import css from './css';

export class Saver extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusIndex: 0
		};
		this.letters = [];
		this.onLetterSelection = this.onLetterSelection.bind(this);
	}
	onLetterSelection(index, letter) {
		this.letters[index] = letter;
		if (index === 2) {
			this.props.saveRank({
				name: this.letters.join(''),
				performance: this.props.performance
			});
		}
		else {
			this.setState({
				focusIndex: this.state.focusIndex + 1
			});
		}
	}
	render() {
		return (
			<div className={css.saver}>
				<div>
					score: {this.props.performance.score} <br />
					ok: {this.props.performance.ok} <br />
					good: {this.props.performance.good} <br />
					excellent: {this.props.performance.excellent} <br /><br />
				</div>
				<Letter
					index={0}
					focus={this.state.focusIndex === 0}
					letter="A"
					height={100}
					duration={200}
					onSelection={this.onLetterSelection}
				/>
				<Letter
					index={1}
					focus={this.state.focusIndex === 1}
					letter="A"
					height={100}
					duration={200}
					onSelection={this.onLetterSelection}
				/>
				<Letter
					index={2}
					focus={this.state.focusIndex === 2}
					letter="A"
					height={100}
					duration={200}
					onSelection={this.onLetterSelection}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		performance: getPerformance(state),
	};
}

export default connect(mapStateToProps, { saveRank })(Saver);
