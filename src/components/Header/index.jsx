import React from 'react';
import css from './css';

const headline = (props) => {
	let content = (
		<h1>Game status unknown</h1>
	);
	if (props && props.game) {
		switch (props.game.status) {
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
			case 'waiting':
				content = (
					<div>
						<h1>Pieds sur les pads gauche et droit</h1>
						<div className={css.waiting}>
							<div className={css.waitingBar}></div>
						</div>
					</div>
				);
				break;
			case 'loading':
				content = (
					<div>
						<h1>Lancement du jeu...</h1>
						<div className={css.loading}>
							<div className={css.loadingBar}></div>
						</div>
					</div>
				);
				break;
			case 'started':
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
						<button onClick={props.startGame}>Start new game</button>
					</div>
				);
				break;
			default:
		}
	}
	return content;
};

export function Header(props) {
	if (props && props.game && props.game.status === 'started') {
		// waiting for react 0.15 to be allowed to return null
		return (
			<noscript />
		);
	}
	return (
		<div className={css.header}>
			<img src="img/logo.png" />
			{headline(props)}
		</div>
	);
}
