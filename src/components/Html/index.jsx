import React, { Component } from 'react';
import { connect } from 'react-redux';
import U from '../../utils';
import * as gameActions from '../../actions/game';
import Headline from './Headline';
import Progression from './Progression';
import Performance from './Performance';
import Lines from './Lines';
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
				<div className={css.logo}>
					<img src="img/logo.png" />
				</div>
				<Headline direction="in" lineNumber="line1">
					Prenez vos marques sur le tapis
				</Headline>
				<Headline direction="in" lineNumber="line2">
					Pour entrer dans la danse
				</Headline>
			</div>
		);
		const zoomContent = this.props.game.get('status') !== 'zoom' ? null : (
			<div>
				<Headline direction="out" lineNumber="line1">
					Prenez vos marques sur le tapis
				</Headline>
				<Headline direction="out" lineNumber="line2">
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
		const gameContent = !U.isGame(this.props.game) ? null : (
			<div>
				<Progression />
				<Performance />
				<Lines />
			</div>
		);
		const hitsContent = !U.isGame(this.props.game) ? null : <Hits />;
		const finalContent = !U.showFinal(this.props.game) ? null : <Final />;
		return (
			<div className={css.html}>
				{idleContent}
				{zoomContent}
				{waitContent}
				{gameContent}
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
