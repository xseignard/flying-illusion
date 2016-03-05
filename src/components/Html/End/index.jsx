import React from 'react';
import Texte from '../common/Texte';
import Background from '../common/Background';
import commonCss from '../common/css';
import css from './css';

export default () => {
	return (
		<div className={css.end}>
			<Background animated="out" />
			<div className={css.logo}>
				<img src="img/logo.png" />
			</div>
			<div className={css.flyingHeroes}>
				<h1 className={css.crew}>Flying Heroes</h1>
				<div className={css.dancers}>
					<div>Benny</div>
					<div>Lil Amok</div>
					<div>Robozee</div>
					<div>Demon</div>
					<div>Ukay</div>
					<div>Kalli</div>
					<div>Willy</div>
				</div>
			</div>
			<div className={css.darkIllusions}>
				<h1 className={css.crew}>Dark Illusions</h1>
				<div className={css.dancers}>
					<div>Lil Rock</div>
					<div>Junior</div>
					<div>Rubberlegz</div>
					<div>Lil Ceng</div>
					<div>Minzy</div>
					<div>Kalli</div>
					<div>Willy</div>
				</div>
			</div>
			<div className={commonCss.hint}>
				<Texte>APPUYEZ SUR</Texte>
				<div className={commonCss.arrow_right}></div>
				<Texte>POUR TERMINER LE JEU</Texte>
			</div>
		</div>
	);
};
