import React from 'react';

export class Game extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}
	componentDidUpdate(prevProps) {
		if (
			prevProps.game.status !== 'started' &&
			this.props.game.status === 'started'
		) {
			this.props.startChoreography();
		}
		if (prevProps.playerSteps.length < this.props.playerSteps.length) {
			console.log('new player action');
		}
	}
	render() {
		let gameContent = null;
		if (this.props.game.status === 'started') {
			gameContent = (
				<button onClick={this.props.onResetGame}>Reset Game</button>
			);
		}
		return (
			<div ref="game">
				{gameContent}
			</div>
		);
	}
}
