import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Progression from '../common/Progression';
import Hits from '../common/Hits';
import Performance from '../common/Performance';
import Lines from '../common/Lines';
import Text from '../common/Text';
import Background from '../common/Background';
import {
	animateReady,
	animateRules
} from './animate';
import css from './css';


export default class Rank extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		animateReady(findDOMNode(this.refs.ready));
		animateRules(findDOMNode(this.refs.rules));
	}
	render() {
		return (
			<div className={css.tuto}>
				<Background animated />
				<div>
					<Text ref="ready" className={css.ready}>
						PRÊT À ENTRER EN SCÈNE ?
					</Text>
					<Text ref="rules" className={css.rules}>
						RÈGLES DU JEU
					</Text>
					<Text ref="rules2" className={css.rules2}>
						SUIVEZ LES INDICATIONS À L’ÉCRAN
					</Text>
					<Text ref="rules3" className={css.rules3}>
						ET REPRODUISEZ LES MOUVEMENTS SUR LE TAPIS
					</Text>
				</div>
				<Hits />
				<Progression />
				<Performance />
				<Lines />
			</div>
		);
	}
}
