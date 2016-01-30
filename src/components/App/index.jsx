import React from 'react';
import css from './css';

export function DumbApp(props) {
	let content;
	switch (props.game) {
		case 'intro':
			content = (
				<h1>Marchez sur les pads gauche et droit pour rejoindre le battle</h1>
			);
			break;
		case 'pending':
			content = (
				<h1>Enlevez les pieds des pads gauche et droit pour commencer le battle</h1>
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
			content = (
				<h1>Game status unknown</h1>
			);
	}
	return (
		<div className={css.app}>
			{content}
		</div>
	);
}
