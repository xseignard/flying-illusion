import React from 'react';
import classnames from 'classnames';
import css from './css';

export function DumbApp(props) {
	let content = <h1>Game status unknown</h1>;
	if (props && props.game) {
		switch (props.game.status) {
			case 'intro':
				content = (
					<h1>Place tes pieds<br />sur les pads gauche et droit</h1>
				);
				break;
			case 'selecting':
				content = (
					<div>
						<h1>Selection nouveau joueur...</h1>
					</div>
				);
				break;
			case 'selected':
				content = (
					<h1>Bienvenue!<br />Place tes pieds en dehors des pads<br />pour commencer le jeu</h1>
				);
				break;
			case 'starting':
				content = (
					<h1>Lancement du jeu...</h1>
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
		[css.delay2sec]: props && props.game && props.game.status === 'selecting',
		[css.delay4sec]: props && props.game && props.game.status === 'starting'
	});
	return (
		<div className={css.app}>
			<img src="img/logo.png" />
			{content}
			<div className={loaderClass}></div>
		</div>
	);
}
