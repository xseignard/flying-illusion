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
					<div className={css.dancers}>
						<div>Benny</div>
						<div>Lil Amok</div>
						<div>Robozee</div>
						<div>Demon</div>
						<div>Ukay</div>
						<div>Kalli</div>
						<div>Willy</div>
					</div>
				</Texte>
			</div>
			<div className={css.darkIllusions}>
				<Texte>
					<h1 className={css.crew}>Dark Illusions</h1>
					<div className={css.dancers}>
						<div>Lil Rock</div>
						<div>Junior</div>
						<div>Rubberlegz</div>
						<div>Lil Ceng</div>
						<div>Minzy</div>
					</div>
				</Texte>
			</div>
		</div>
	);
};
