import React from 'react';
import Texte from '../common/Texte';
import commonCss from '../common/css';
import css from './css';

export default () => {
	return (
		<div className={css.end}>
			<div className={commonCss.logo}>
				<img src="img/logo.png" />
			</div>
			<div className={css.flyingHeroes}>
				<Texte>
					<h1 className={css.crew}>Flying Heroes</h1>
					<h1 className={css.dancers}>Benny</h1>
					<h1 className={css.dancers}>Lil Amok</h1>
					<h1 className={css.dancers}>Robozee</h1>
					<h1 className={css.dancers}>Demon</h1>
					<h1 className={css.dancers}>Ukay</h1>
					<h1 className={css.dancers}>Kalli</h1>
					<h1 className={css.dancers}>Willy</h1>
				</Texte>
			</div>
			<div className={css.darkIllusions}>
				<Texte>
					<h1 className={css.crew}>Dark Illusions</h1>
					<h1 className={css.dancers}>Lil Rock</h1>
					<h1 className={css.dancers}>Junior</h1>
					<h1 className={css.dancers}>Rubberlegz</h1>
					<h1 className={css.dancers}>Lil Ceng</h1>
					<h1 className={css.dancers}>Minzy</h1>
				</Texte>
			</div>
		</div>
	);
};
