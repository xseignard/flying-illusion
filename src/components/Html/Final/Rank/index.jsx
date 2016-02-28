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
			return (
				<div key={index}>
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
			const suffix = index === 0 ? 'ER' : 'ÈME';
			return (
				<div key={index}>
					{this.props.rank - 1 + index}{suffix} {record.player} {record.score}
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

function mapStateToProps(state) {
	return {
		records: getSortedRecords(state)
	};
}

export default connect(mapStateToProps)(Rank);
