import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../../constants';
import css from './css';

export class Video extends Component {
	constructor(props) {
		super(props);
		this.videoSynchronization = this.videoSynchronization.bind(this);
		this.videoNames = [
			'idle_zoom',
			'intro_tuto',
			'wait',
			'warning',
			'load',
			'Last_Resistance',
			'recap',
			'save_rank',
			'end'
		];
	}
	componentDidMount() {
		const video = this.refs[this.props.game.get('status')];
		if (video) {
			video.play();
			video.classList.add(css.above);
		}
		this.videoSynchronization();
	}
	componentWillReceiveProps(nextProps) {
		const status = this.props.game.get('status');
		const nextStatus = nextProps.game.get('status');
		// arriving to zoom, tuto or rank wont make the video change
		if (
			(status === nextStatus && status !== 'idle') ||
			nextStatus.match(/zoom|tuto|rank/)
		) return false;

		let currentVideoEl = this.refs[status];
		let nextVideoEl = this.refs[nextStatus];

		if (nextStatus === 'idle') {
			nextVideoEl = this.refs.idle_zoom;
		}
		else if (nextStatus === 'intro') {
			currentVideoEl = this.refs.idle_zoom;
			nextVideoEl = this.refs.intro_tuto;
		}
		else if (nextStatus === 'wait' && status.match(/warning|load/)) {
			nextVideoEl = this.refs.wait;
		}
		else if (nextStatus === 'wait') {
			currentVideoEl = this.refs.intro_tuto;
		}
		else if (nextStatus === 'play') {
			nextVideoEl = this.refs[nextProps.choregraphy.get('name')];
		}
		else if (nextStatus === 'recap') {
			currentVideoEl = this.refs[this.props.choregraphy.get('name')];
		}
		else if (nextStatus === 'save') {
			nextVideoEl = this.refs.save_rank;
		}
		else if (nextStatus === 'end') {
			currentVideoEl = this.refs.save_rank;
		}

		if (status === 'save') {
			currentVideoEl = this.refs.save_rank;
		}

		if (nextVideoEl) {
			nextVideoEl.play();
			nextVideoEl.classList.add(css.above);
		}
		if (currentVideoEl) {
			currentVideoEl.classList.remove(css.above);
			currentVideoEl.pause();
			currentVideoEl.currentTime = 0;
		}
	}
	videoSynchronization() {
		this.videoNames.forEach((name) => {
			this.refs[name].addEventListener('play', (e) => {
				if (this.props.game.get('status') === 'play' && name === 'Last_Resistance') {
					// FIXME: Find better way to sync video
					const delay = Date.now() - this.props.choregraphy.get('time') + 400;
					this.refs[name].currentTime = delay / 1000;
				}
			});
		});
	}
	render() {
		const videosContent = this.videoNames.map((name) => {
			const videoSrc = `videos/${name}.mp4`;
			return (
				<video
					ref={name}
					key={name}
					src={videoSrc}
					width={C.APP_WIDTH}
					height={C.APP_HEIGHT}
					loop
					preload="auto"
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

const mapStateToProps = (state) => {
	return {
		admin: state.admin,
		game: state.game,
		choregraphy: state.choregraphy,
	};
};

export default connect(mapStateToProps)(Video);
