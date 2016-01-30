import React from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../../actions/game';
import { listenToPads } from '../../actions/pads';
import { DumbApp } from '../../components/App';

export class App extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.listenToPads();
	}
	render() {
		return (
			<DumbApp
				game={this.props.game}
				onResetGame={this.props.resetGame}
			/>
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
		}
	};
};

export default connect(state => state, mapDispatchToProps)(App);
