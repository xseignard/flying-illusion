import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPerformance } from '../../../selectors/performance';
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
		const ranksContent = this.props.game.get('status') !== 'rank' ? null : (
			<div>
				<Text className={css.h1}>
					CLASSEMENT
				</Text>
				<div className={css.score}>
					{this.props.performance.score} POINTS
				</div>
				<Rank />
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
	};
}

export default connect(mapStateToProps)(Final);
