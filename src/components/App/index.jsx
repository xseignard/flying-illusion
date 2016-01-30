import React from 'react';
import classnames from 'classnames';
import css from './css';

export function DumbApp(props) {
	let content = <h1>Game status unknown</h1>;
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
					<h1>Place tes pieds<br />sur les pads gauche et droit</h1>
				);
				break;
			case 'loading':
				content = (
					<div>
						<h1>Lancement du jeu...</h1>
					</div>
				);
				break;
			case 'started':
				content = (
					<div>
						<h1>Game is on!</h1>
						<button onClick={props.onResetGame}>Reset Game</button>
					</div>
				);
				break;
			default:
		}
	}
	const loaderClass = classnames({
		[css.loader]: true,
		[css.loading]: props && props.game && props.game.status === 'loading'
	});
	return (
		<div className={css.app}>
			<img src="img/logo.png" />
			{content}
			<div className={loaderClass}></div>
		</div>
	);
}
