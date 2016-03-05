import React, { Component } from 'react';
import Texte from '../common/Texte';
import Background from '../common/Background';
import {
	animateReady,
	animateRule,
	animateRule2,
	animateRule3
} from './animate';
import css from './css';


export default class Rank extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		animateReady(this.refs.ready);
		animateRule(this.refs.rule);
		animateRule2(this.refs.rule2);
		animateRule3(this.refs.rule3);
	}
	render() {
		return (
			<div className={css.tuto}>
				<Background animated="in"/>
				<div ref="ready" className={css.ready}>
					<Texte>PRÊT À ENTRER EN SCÈNE ?</Texte>
				</div>
				<div ref="rule" className={css.rule}>
					<Texte>RÈGLES DU JEU</Texte>
				</div>
				<div ref="rule2" className={css.rule2}>
					<Texte>SUIVEZ LES INDICATIONS À L’ÉCRAN</Texte>
				</div>
				<div ref="rule3" className={css.rule3}>
					<Texte>ET REPRODUISEZ LES MOUVEMENTS SUR LE TAPIS</Texte>
				</div>
			</div>
		);
	}
}
