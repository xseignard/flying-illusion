import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/game';
import { GameHeader } from '../GameHeader';
import { GameFooter } from '../GameFooter';
import { getActiveMoves } from '../../actions/moves/helpers';
import css from './css';

export class Game extends Component {
	constructor(props) {
		super(props);
		// FOR DEV PURPOSES, GAME CAN BE STARTED IMMEDIATELY
		if (this.props.game.status === 'started') {
			this.props.startGame();
		}
	}
	componentWillUnmount() {
		this.props.stopGame();
	}
	render() {
		if (this.props.game.status !== 'started') {
			return null;
		}
		return (
			<div
				ref="game"
				className={css.game}
			>
				<GameHeader moves={this.props.moves} />
				<GameFooter score={this.props.score} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
		score: state.score,
		moves: getActiveMoves(state.moves),
		steps: state.steps
	};
}
// https://github.com/rackt/react-redux/blob/master/docs/api.md
export default connect(mapStateToProps, gameActions)(Game);
