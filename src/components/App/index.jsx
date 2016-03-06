import React, { Component } from 'react';
import { connect } from 'react-redux';
import U from '../../utils';
import { setDevGameState } from '../../dev/game-state';
import { slaveRequestAnimationFrame } from '../../threads/master';
import { listenToClicks } from '../../actions/admin';
import { loadRecords } from '../../actions/records';
import * as gameActions from '../../actions/game';
import { animate, reset } from './animate';
import Admin from '../Admin';
import Video from '../Video';
import Audio from '../Audio';
import Sound from '../Sound';
import Webgl from '../Webgl';
import Html from '../Html';
import css from './css';

export class App extends Component {
	constructor(props) {
		super(props);
		this.animate = this.animate.bind(this);
		this.threeRefs = {};
		this.targetsRefs = {};
		this.movesRefs = {};
	}
	componentDidMount() {
		this.props.listenToClicks();
		this.props.loadRecords();
		this.props.launchAssets();
		setDevGameState(this.props.game.get('status'));
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
		animate(this.threeRefs, this.targetsRefs, this.movesRefs);
		if (this.shouldAnimate) requestAnimationFrame(this.animate);
		else reset(this.targetsRefs, this.movesRefs);
		this.threeRefs.renderer.render(this.threeRefs.scene, this.threeRefs.camera);
		slaveRequestAnimationFrame();
	}
	render() {
		const adminContent = !this.props.admin.get('visible') ? null : <Admin />;
		return (
			<div className={css.app}>
				<div className={css.media}>
					<Video />
					<Audio />
					<Sound />
				</div>
				<div className={css.webgl}>
					<Webgl
						threeRefs={this.threeRefs}
						targetsRefs={this.targetsRefs}
						movesRefs={this.movesRefs}
					/>
				</div>
				<div className={css.html}>
					<Html />
				</div>
				{adminContent}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		admin: state.admin,
		game: state.game,
	};
};

const mapDispatchToProps = Object.assign(
	{ listenToClicks, loadRecords }
	, gameActions
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
