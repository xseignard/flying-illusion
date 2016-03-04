import React, { Component } from 'react';
import Progression from '../common/Progression';
import Hits from '../common/Hits';
import Performance from '../common/Performance';
import Lines from '../common/Lines';
import Text from '../common/Text';
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
				<Background animated />
				<div ref="ready" className={css.ready}>
					<Text>PRÊT À ENTRER EN SCÈNE ?</Text>
				</div>
				<div ref="rule" className={css.rule}>
					<Text>RÈGLES DU JEU</Text>
				</div>
				<div ref="rule2" className={css.rule2}>
					<Text>SUIVEZ LES INDICATIONS À L’ÉCRAN</Text>
				</div>
				<div ref="rule3" className={css.rule3}>
					<Text>ET REPRODUISEZ LES MOUVEMENTS SUR LE TAPIS</Text>
				</div>
				<Hits />
				<Progression />
				<Performance />
				<Lines />
			</div>
		);
	}
}
