import React from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../../actions/game';
import { listenToPads } from '../../actions/pads';
import { Header } from '../../components/Header';
import { Game } from '../../components/Game';
import { startChoreography } from '../../actions/choreography.js';
import css from './css';

export class App extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.listenToPads();
	}
	componentWillUpdate(prevProps) {
	}
	render() {
		return (
			<div className={css.app}>
				<Header
					game={this.props.game}
				/>
				<Game
					game={this.props.game}
					playerSteps={this.props.playerSteps}
					targetSteps={this.props.targetSteps}
					startChoreography={this.props.startChoreography}
					onResetGame={this.props.resetGame}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		resetGame() {
			dispatch(resetGame());
		},
		listenToPads() {
			dispatch(listenToPads());
		},
		startChoreography() {
			dispatch(startChoreography());
		}
	};
};

export default connect(state => state, mapDispatchToProps)(App);
