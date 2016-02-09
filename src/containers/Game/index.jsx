import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/game';
import GameHeader from '../GameHeader';
import GameFooter from '../GameFooter';
import Moves from '../Moves';
import css from './css';

export class Game extends Component {
	constructor() {
		super();
		this.didMount = false;
	}
	componentDidMount() {
		this.didMount = true;
		// FOR DEV PURPOSES, GAME CAN BE STARTED IMMEDIATELY
		if (this.props.game.get('status') === 'play') {
			this.props.startGame();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (
			this.props.game.get('status') === 'load' &&
			nextProps.game.get('status') === 'play'
		) {
			console.log('starting game');
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
			<div className={css.game}>
				<GameHeader />
				<GameFooter />
				<Moves />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game
	};
}
// https://github.com/rackt/react-redux/blob/master/docs/api.md
export default connect(mapStateToProps, gameActions)(Game);
