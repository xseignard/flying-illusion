import React, { Component } from 'react';
import { connect } from 'react-redux';
import U from '../../utils';
import { listenToMovesWorker } from '../../actions/moves';
import { listenToPads } from '../../actions/pads';
import { loadScores } from '../../actions/scores';
import * as gameActions from '../../actions/game';
import Video from '../Video';
import Audio from '../Audio';
import Webgl from '../Webgl';
import Html from '../Html';
import css from './css';

export class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.listenToMovesWorker();
		this.props.listenToPads();
		this.props.loadScores();
		// FIXME: FOR DEV PURPOSES, GAME CAN BE STARTED IMMEDIATELY
		if (this.props.game.get('status') === 'devplay') {
			this.props.launchPlay();
		}
		else if (this.props.game.get('status') === 'devrecap') {
			this.props.launchRecap();
		}
		else if (this.props.game.get('status') === 'devrank') {
			this.props.launchRank();
		}
	}
	render() {
		const webGlContent = !U.showWebgl(this.props.game) ? null : (
			<div className={css.webgl}>
				<Webgl />
			</div>
		);
		return (
			<div className={css.app}>
				<div className={css.video}>
					<Video />
					<Audio />
				</div>
				{webGlContent}
				<div className={css.html}>
					<Html />
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = Object.assign(
	{ listenToMovesWorker, listenToPads, loadScores }
	, gameActions
);

export default connect(state => state, mapDispatchToProps)(App);
