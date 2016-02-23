import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearScores } from '../../../../actions/scores';
import css from './css';

export class Rank extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const scoresContent = this.props.scores.map((score, index) => {
			return (
				<div key={index}>
					{score.name} : {score.score}
				</div>
			);
		});
		return (
			<div>
				<div
					className={css.clearScores}
					onClick={this.props.clearScores}
				>
					Clear scores
				</div>
				<div className={css.scores}>
					{scoresContent}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		scores: state.scores,
	};
}

export default connect(mapStateToProps, { clearScores })(Rank);
