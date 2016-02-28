import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPerformance } from '../../../selectors/performance';
import { getSortedRecords } from '../../../selectors/records';
import Text from '../Text';
import Recap from './Recap';
import Save from './Save';
import Rank from './Rank';
import css from './css';

export class Final extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.animation = this.refs.final.animate([
			{ transform: 'scaleY(0)' },
			{ transform: 'scaleY(1)' }
		], {
			duration: 400,
			easing: 'ease-in'
		});
		this.animation.onfinish = () => {
			this.refs.final.classList.add(css.loaded);
		};
	}
	render() {
		const recapContent = this.props.game.get('status') !== 'recap' ? null : (
			<div>
				<Text className={css.h1}>
					PARTIE FINIE
				</Text>
				<div className={css.score}>
					{this.props.performance.score} POINTS
				</div>
				<Recap />
			</div>
		);
		const saveContent = this.props.game.get('status') !== 'save' ? null : (
			<div>
				<Text className={css.h1}>
					PARTIE FINIE
				</Text>
				<div className={css.score}>
					{this.props.performance.score} POINTS
				</div>
				<Save />
			</div>
		);
		const index = this.props.records.findIndex(record => {
			return record.time === this.props.recordId;
		});
		const rank = index + 1;
		const ranksContent = this.props.game.get('status') !== 'rank' ? null : (
			<div>
				<Text className={css.h1}>
					CLASSEMENT
				</Text>
				<div className={css.rank}>
					<span>{rank}</span>
					<sup className={css.suffix}>{rank === 1 ? 'ER' : 'ÈME'}</sup>
					<span> sur {this.props.records.size}</span>
				</div>
				<Rank rank={index} />
			</div>
		);
		return (
			<div
				ref="final"
				className={css.final}
			>
				{recapContent}
				{saveContent}
				{ranksContent}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
		performance: getPerformance(state),
		records: getSortedRecords(state),
		recordId: state.choregraphy.get('time')
	};
}

export default connect(mapStateToProps)(Final);
