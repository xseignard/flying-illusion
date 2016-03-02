import React, { Component } from 'react';
import { connect } from 'react-redux';
import Isvg from 'react-inlinesvg';
import U from '../../utils';
import * as gameActions from '../../actions/game';
import Headline from './Headline';
import Performance from './Performance';
import Hits from './Hits';
import Final from './Final';
import css from './css';

export class Html extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const idleContent = this.props.game.get('status') !== 'idle' ? null : (
			<div>
				<Headline lineNumber="line1">
					Prenez vos marques sur le tapis
				</Headline>
				<Headline lineNumber="line2">
					Pour entrer dans la danse
				</Headline>
			</div>
		);
		const waitContent = this.props.game.get('status') !== 'wait' ? null : (
			<div>
				<div>
					<Headline lineNumber="line1">
						Maintenez
						<div className={css.arrow_left}></div>
						et
						<div className={css.arrow_right}></div>
						avec vos pieds
					</Headline>
					<Headline lineNumber="line2">
						pour commencer à jouer
					</Headline>
				</div>
			</div>
		);
		const loadContent = this.props.game.get('status') !== 'load' ? null : (
			<div className={css.loading}>
				<div className={css.loadingBar}></div>
			</div>
		);
		const performanceContent = !U.isGame(this.props.game) ? null : <Performance />;
		const hitsContent = !U.isGame(this.props.game) ? null : <Hits />;
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
				{hitsContent}
				{finalContent}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		game: state.game,
	};
};

export default connect(mapStateToProps, gameActions)(Html);
