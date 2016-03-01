import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSortedRecords } from '../../../../selectors/records';
import css from './css';

export class Rank extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const podiumList = this.props.records.filter((record, index) => {
			return index < 3;
		});
		const podiumContent = podiumList.map((record, index) => {
			const suffix = index === 0 ? 'ER' : 'ÈME';
			// apply special class to the current score
			const currentScoreClass = this.props.rank === index ? css.podiumScore : '';
			return (
				<div key={index} className={currentScoreClass}>
					{index + 1}{suffix} {record.player} {record.score}
				</div>
			);
		});

		const rankList = this.props.records.filter((record, index) => {
			// player is first ranked or last ranked
			if (
				this.props.rank === 0 ||
				this.props.rank === this.props.records.size - 1
			) {
				return Math.abs(index - this.props.rank) <= 2;
			}
			// otherwise
			return Math.abs(index - this.props.rank) <= 1;
		});
		const rankContent = rankList.map((record, index) => {
			// if the player made the best score, use ER instead of ÈME
			const suffix = (
				this.props.rank === index &&
				this.props.rank === 0
			) ? 'ER' : 'ÈME';
			// apply correction to the index of map to get rank position
			let correction = 0;
			// best score needs a rank correction of 1
			if (this.props.rank === 0) {
				correction = 1;
			}
			// worst score needs a correction of -1
			else if (this.props.rank === this.props.records.size - 1) {
				correction = -1;
			}
			// apply special class to the current score
			const currentScoreClass = (
				(correction === 1 && index === 0) ||
				(correction === 0 && index === 1) ||
				(correction === -1 && index === 2)
			) ? css.ranksScore : '';
			return (
				<div key={index} className={currentScoreClass}>
					{this.props.rank + correction + index}{suffix} {record.player} {record.score}
				</div>
			);
		});
		return (
			<div className={css.rank}>
				<div className={css.ranks}>
					{rankContent}
				</div>
				<div className={css.podium}>
					{podiumContent}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		records: getSortedRecords(state)
	};
};

export default connect(mapStateToProps)(Rank);
