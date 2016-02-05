import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPerformance } from '../../selectors/performance';
import * as gameActions from '../../actions/game';
import { GameHeader } from '../GameHeader';
import { GameFooter } from '../GameFooter';
import css from './css';

export class Game extends Component {
	constructor(props) {
		super(props);
		// FOR DEV PURPOSES, GAME CAN BE STARTED IMMEDIATELY
		if (this.props.game.get('status') === 'play') {
			this.props.startGame();
		}
	}
	componentWillUnmount() {
		this.props.stopGame();
	}
	render() {
		if (this.props.game.get('status') !== 'play') {
			return null;
		}
		return (
			<div
				ref="game"
				className={css.game}
			>
				<GameHeader choregraphy={this.props.choregraphy} />
				<GameFooter performance={this.props.performance} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
		steps: state.steps,
		choregraphy: state.choregraphy,
		performance: getPerformance(state),
	};
}
// https://github.com/rackt/react-redux/blob/master/docs/api.md
export default connect(mapStateToProps, gameActions)(Game);
