import React from 'react';
import Texte from '../common/Texte';
import css from './css';

export default () => {
	return (
		<div className={css.warning}>
			<div className={css.headline}>
				<Texte>AVERTISSEMENT</Texte>
			</div>
			<div className={css.content}>
				<Texte>
					<br />Ce jeu est déconseillé aux femmes enceintes.<br /><br />
					La participation d’un enfant mineur à ce jeu
					doit se faire sous la surveillance d’un adulte.<br /><br />
					La société Red Bull ne peut être tenue pour responsable
					de tout dommage physique résultant de votre participation
					à ce jeu, ni de tout dommage résultant d'une panne technique
					ou d'une atteinte au système de traitement automatisé de données,
					de difficultés provenant du réseau de transmissions de données,
					d'une interruption temporaire ou d'un arrêt définitif du jeu
					ou de tout fait hors de son contrôle.<br /><br />
					Votre participation se fera sous votre seule responsabilité;
					en aucun cas la responsabilité de Red Bull ne pourra être recherchée.
					Votre participation au jeu emporte votre pleine acceptation des risques.
				</Texte>
			</div>
		</div>
	);
};
