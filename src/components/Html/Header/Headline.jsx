import React, { Component } from 'react';
import css from './css';

export default class Headline extends Component {
	constructor(props) {
		super(props);
		this.addLoadedClass = this.addLoadedClass.bind(this);
	}
	componentDidMount(prevProps) {
		this.addLoadedClass();
	}
	shouldComponentUpdate(nextProps) {
		return nextProps.game.get('status') !== this.props.game.get('status');
	}
	componentDidUpdate(prevProps) {
		this.addLoadedClass();
	}
	addLoadedClass() {
		if (this.refs.headline) {
			setTimeout(() => {
				this.refs.headline.classList.remove(css.loaded);
				setTimeout(() => {
					this.refs.headline.classList.add(css.loaded);
				}, 100);
			}, 0);
		}
	}
	render() {
		let content = (
			<h1>Game status unknown</h1>
		);
		if (this.props && this.props.game) {
			switch (this.props.game.get('status')) {
				case 'idle':
					content = (
						<div ref="headline">
							<h1>Prenez vos marques sur le tapis</h1>
							<h1>Pour entrer dans la danse</h1>
						</div>
					);
					break;
				case 'intro':
					content = (
						<div ref="headline">
						</div>
					);
					break;
				case 'wait':
					content = (
						<div ref="headline">
							<h1>Pieds sur les pads gauche et droit</h1>
							<div className={css.waiting}>
								<div className={css.waitingBar}></div>
							</div>
						</div>
					);
					break;
				case 'load':
					content = (
						<div ref="headline">
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
						<div ref="headline">
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
