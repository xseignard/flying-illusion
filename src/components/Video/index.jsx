import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../../constants';
import css from './css';

export class Video extends Component {
	constructor(props) {
		super(props);
		this.gameStates = [
			'idle',
			'intro',
			'wait',
			'load',
			'play',
			'end'
		];
		this.state = {
			muted: true
		};
	}
	componentDidMount() {
		const video = this.refs[this.props.game.get('status')];
		if (video) {
			video.play();
			video.classList.add(css.above);
		}
	}
	componentWillReceiveProps(nextProps) {
		const currentGame = this.props.game.get('status');
		const nextGame = nextProps.game.get('status');
		const currentVideo = currentGame === 'tuto' ? 'intro' : currentGame;
		const nextVideo = nextGame === 'tuto' ? 'intro' : nextGame;
		if (currentVideo === nextVideo) {
			return false;
		}
		const currentVideoEl = this.refs[currentVideo];
		const nextVideoEl = this.refs[nextVideo];
		if (nextVideoEl) {
			nextVideoEl.play();
			nextVideoEl.classList.add(css.above);
		}
		if (currentVideoEl) {
			currentVideoEl.classList.remove(css.above);
			currentVideoEl.pause();
		}
	}
	render() {
		const videosContent = this.gameStates.map((state) => {
			const videoSrc = `videos/${state}.mp4`;
			return (
				<video
					ref={state}
					key={state}
					src={videoSrc}
					width={C.APP_WIDTH}
					height={C.APP_HEIGHT}
					loop
					preload
				></video>
			);
		});
		return (
			<div className={css.video}>
				{videosContent}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game
	};
}

export default connect(mapStateToProps)(Video);
