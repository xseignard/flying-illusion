import React from 'react';
import Headline from '../common/Headline';
import Texte from '../common/Texte';
import Circle from '../common/Circle';
import css from './css';
import commonCss from '../common/css';

export default () => {
	return (
		<div>
			<div className={commonCss.headline}>
				<Circle />
				<Headline
					direction="in"
					lineNumber="line1"
					delay={400}
				>
					Soyez prêt
				</Headline>
				<Headline
					direction="in"
					lineNumber="line2"
					delay={400}
				>
					Le jeu va commencer !
				</Headline>
			</div>
			<div className={css.warning}>
				<div className={css.headline}>
					<Texte>AVERTISSEMENT</Texte>
				</div>
				<div className={css.content}>
					<Texte>
						<br />Ce jeu est déconseillé aux femmes enceintes.<br />
						La participation d’un enfant mineur à ce jeu
						doit se faire sous la surveillance d’un adulte.<br />
						La société Red Bull ne peut être tenue pour responsable
						de tout dommage physique résultant de votre participation
						à ce jeu, ni de tout dommage résultant d'une panne technique
						ou d'une atteinte au système de traitement automatisé de données,
						de difficultés provenant du réseau de transmissions de données,
						d'une interruption temporaire ou d'un arrêt définitif du jeu
						ou de tout fait hors de son contrôle.<br />
						Votre participation se fera sous votre seule responsabilité;
						en aucun cas la responsabilité de Red Bull ne pourra être recherchée.
						Votre participation au jeu emporte votre pleine acceptation des risques.
					</Texte>
				</div>
			</div>
		</div>
	);
};
