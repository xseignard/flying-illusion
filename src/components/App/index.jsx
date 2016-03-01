import React, { Component } from 'react';
import { connect } from 'react-redux';
import U from '../../utils';
import { listenToClicks } from '../../actions/admin';
import { listenToPads } from '../../actions/pads';
import { loadRecords } from '../../actions/records';
import * as gameActions from '../../actions/game';
import { animate } from './animate';
import Admin from '../Admin';
import Video from '../Video';
import Audio from '../Audio';
import Webgl from '../Webgl';
import Html from '../Html';
import css from './css';

export class App extends Component {
	constructor(props) {
		super(props);
		this.animate = this.animate.bind(this);
		this.targetsRefs = {};
		this.movesRefs = {};
	}
	componentDidMount() {
		this.props.listenToClicks();
		this.props.listenToPads();
		this.props.loadRecords();
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
	componentDidUpdate(prevProps) {
		if (this.props.game.get('status') !== prevProps.game.get('status')) {
			if (U.isGame(this.props.game)) {
				this.shouldAnimate = true;
				this.animate();
			}
			else this.shouldAnimate = false;
		}
	}
	animate() {
		if (this.shouldAnimate) {
			requestAnimationFrame(this.animate);
			animate(this.targetsRefs, this.movesRefs);
		}
	}
	render() {
		const adminContent = !this.props.admin.get('visible') ? null : (
			<Admin />
		);
		const webGlContent = !U.showWebgl(this.props.game) ? null : (
			<div className={css.webgl}>
				<Webgl
					targetsRefs={this.targetsRefs}
					movesRefs={this.movesRefs}
				/>
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
				{adminContent}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		admin: state.admin,
		game: state.game,
		choregraphy: state.choregraphy,
		moves: state.dance.get('moves'),
	};
}

const mapDispatchToProps = Object.assign(
	{ listenToClicks, listenToPads, loadRecords }
	, gameActions
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
