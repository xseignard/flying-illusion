import React, { Component } from 'react';
import css from './css';

export default class Headline extends Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps) {
		return nextProps.game.get('status') !== this.props.game.get('status');
	}
	render() {
		let content = (
			<h1>Game status unknown</h1>
		);
		if (this.props && this.props.game) {
			switch (this.props.game.get('status')) {
				case 'idle':
					content = (
						<h1>Touche un pad pour lancer l'intro</h1>
					);
					break;
				case 'intro':
					content = (
						<h1>Regarde l'intro (5 secondes)</h1>
					);
					break;
				case 'wait':
					content = (
						<div>
							<h1>Pieds sur les pads gauche et droit</h1>
							<div className={css.waiting}>
								<div className={css.waitingBar}></div>
							</div>
						</div>
					);
					break;
				case 'load':
					content = (
						<div>
							<h1>Lancement du jeu...</h1>
							<div className={css.loading}>
								<div className={css.loadingBar}></div>
							</div>
						</div>
					);
					break;
				case 'play':
				// waiting for react 0.15 to be allowed to return null
					content = (
						<noscript />
					);
					break;
				case 'end':
				// waiting for react 0.15 to be allowed to return null
					content = (
						<div>
							<h1>Nice game! Save your score</h1>
							<button onClick={this.props.startGame}>Start new game</button>
						</div>
					);
					break;
				default:
			}
		}
		return content;
	}
}
