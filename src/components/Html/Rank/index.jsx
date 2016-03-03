import React, { Component } from 'react';
import { connect } from 'react-redux';
import Text from '../common/Text';
import Background from '../common/Background';
import Lightning from '../common/Lightning';
import { getSortedRecords } from '../../../selectors/records';
import finalCss from '../common/final.css';
import css from './css';

const getPodium = (records) => {
	const podiumRecords = records.filter((record, index) => {
		return index < 3;
	});
	return podiumRecords.map((record, index) => {
		const suffix = index === 0 ? 'ER' : 'ÈME';
		return Object.assign({}, record, { suffix });
	});
};

const getSiblings = (records, rank) => {
	const siblingsRecords = records.filter((record, index) => {
		// player is first ranked or last ranked
		if (
			rank === 0 ||
			rank === records.size - 1
		) {
			return Math.abs(index - rank) <= 2;
		}
		// otherwise
		return Math.abs(index - rank) <= 1;
	});
	return siblingsRecords.map((record, index) => {
		// if the player made the best score, use ER instead of ÈME
		const suffix = (
			rank === index &&
			rank === 0
		) ? 'ER' : 'ÈME';
		// apply correction to the index of map to get rank position
		let correction = 0;
		// best score needs a rank correction of 1
		if (rank === 0) correction = 1;
		// worst score needs a correction of -1
		else if (rank === records.size - 1) correction = -1;

		return Object.assign({}, record, { suffix, correction });
	});
};

export class Rank extends Component {
	constructor(props) {
		super(props);
		if (this.props.records) {
			this.rank = this.props.records.findIndex(record => {
				return record.time === this.props.choregraphy.get('time');
			});
		}
	}
	render() {
		if (!this.props.records) return null;
		const suffix = this.rank === 0 ? 'ER' : 'ÈME';
		const podiumContent = getPodium(this.props.records).map((record, index) => {
			// apply special class to the current score
			const currentScoreClass = this.rank === index ? css.podiumScore : '';
			return (
				<div key={index} className={currentScoreClass}>
					<Text>
						<div className={css.position}>
							{index + 1}
							<sup className={css.suffix}>{record.suffix}</sup>
						</div>
						<div className={css.player}>
							{record.player}
						</div>
						<div className={css.score}>
							{record.score}
						</div>
					</Text>
				</div>
			);
		});
		const siblingsContent = getSiblings(this.props.records, this.rank)
			.map((record, index) => {
				// apply special class to the current score
				const currentScoreClass = (
					(record.correction === 1 && index === 0) ||
					(record.correction === 0 && index === 1) ||
					(record.correction === -1 && index === 2)
				) ? css.siblingsScore : '';
				return (
					<div key={index} className={currentScoreClass}>
						<Text>
							<div className={css.position}>
								{this.rank + record.correction + index}
								<sup className={css.suffix}>{record.suffix}</sup>
							</div>
							<div className={css.player}>
								{record.player}
							</div>
							<div className={css.score}>
								{record.score}
							</div>
						</Text>
					</div>
				);
			});
		return (
			<div className={css.rank}>
				<Background />
				<Text className={finalCss.h1}>
					CLASSEMENT
				</Text>
				<div className={finalCss.score}>
					<span>{this.rank + 1}</span>
					<sup className={css.suffix}>{suffix}</sup>
					<span> sur {this.props.records.size}</span>
				</div>
				<Rank rank={this.rank} />
				<div className={css.siblings}>
					{siblingsContent}
				</div>
				<div className={css.podium}>
					{podiumContent}
				</div>
				<Lightning />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		records: getSortedRecords(state),
		choregraphy: state.choregraphy
	};
};

export default connect(mapStateToProps)(Rank);
