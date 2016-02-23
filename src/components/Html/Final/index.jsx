import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPerformance } from '../../../selectors/performance';
import Recap from './Recap';
import Save from './Save';
import Rank from './Rank';
import css from './css';

export class Final extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const recapContent = this.props.game.get('status') !== 'recap' ? null : (
			<Recap />
		);
		const saveContent = this.props.game.get('status') !== 'save' ? null : (
			<Save />
		);
		const ranksContent = this.props.game.get('status') !== 'rank' ? null : (
			<Rank />
		);
		return (
			<div className={css.final}>
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
	};
}

export default connect(mapStateToProps)(Final);
