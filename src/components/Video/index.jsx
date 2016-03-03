import React, { Component } from 'react';
import { connect } from 'react-redux';
import C from '../../constants';
import css from './css';

export class Video extends Component {
	constructor(props) {
		super(props);
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
		const status = this.props.game.get('status');
		const nextStatus = nextProps.game.get('status');
		// arriving to tuto or rank wont make the video change
		if (nextStatus.match(/zoom|tuto|rank/)) return false;

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
					muted={this.props.admin.get('muted')}
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
