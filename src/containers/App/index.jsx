import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listenToPads } from '../../actions/pads';
import { startGame } from '../../actions/game';
import { Header } from '../../components/Header';
import Game from '../Game';
import css from './css';

export class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.listenToPads();
	}
	render() {
		return (
			<div className={css.app}>
				<Header
					game={this.props.game}
					startGame={this.props.startGame}
				/>
				<Game />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listenToPads() {
			dispatch(listenToPads());
		},
		startGame() {
			dispatch(startGame());
		}
	};
};

export default connect(state => state, mapDispatchToProps)(App);
