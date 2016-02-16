import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listenToPads } from '../../actions/pads';
import { startGame } from '../../actions/game';
import Audio from '../Audio';
import Video from '../Video';
import Webgl from '../Webgl';
import Html from '../Html';
import css from './css';

export class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.listenToPads();
		// FOR DEV PURPOSES, GAME CAN BE STARTED IMMEDIATELY
		if (this.props.game.get('status') === 'dev') {
			this.props.startGame();
		}
	}
	render() {
		const playContent = this.props.game.get('status') !== 'play' ? null : (
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
				{playContent}
				<div className={css.html}>
					<Html />
				</div>
			</div>
		);
	}
}

export default connect(state => state, { listenToPads, startGame })(App);
