import React, { Component } from 'react';
import { connect } from 'react-redux';
import Isvg from 'react-inlinesvg';
import U from '../../utils';
import * as gameActions from '../../actions/game';
import Headline from './Headline';
import Performance from './Performance';
import Final from './Final';
import css from './css';

export class Html extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const idleContent = this.props.game.get('status') !== 'idle' ? null : (
			<Headline
				line1="Prenez vos marques sur le tapis"
				line2="Pour entrer dans la danse"
			/>
		);
		const waitContent = this.props.game.get('status') !== 'wait' ? null : (
			<div>
				<Headline
					line1="Maintenez < et > avec vos pieds sur le tapis"
					line2="pour commencer à jouer"
				/>
				<div className={css.waiting}>
					<div className={css.waitingBar}></div>
				</div>
			</div>
		);
		const loadContent = this.props.game.get('status') !== 'load' ? null : (
			<div className={css.loading}>
				<div className={css.loadingBar}></div>
			</div>
		);
		const performanceContent = !U.showPerformance(this.props.game) ? null : <Performance />;
		const finalContent = !U.showFinal(this.props.game) ? null : <Final />;
		return (
			<div className={css.html}>
				<div className={css.logo}>
					<Isvg src="img/logo.svg" />
				</div>
				{idleContent}
				{waitContent}
				{loadContent}
				{performanceContent}
				{finalContent}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
	};
}

export default connect(mapStateToProps, gameActions)(Html);
