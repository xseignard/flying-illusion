import React, { Component } from 'react';
import { connect } from 'react-redux';
import U from '../../utils';
import C from '../../constants';
import css from './css';

const universVideosNames = [
	'Last_Resistance'
];

const stateVideos = {
	assets: { name: 'idle_zoom', restart: true },
	idle: { name: 'idle_zoom', restart: true },
	zoom: { name: 'idle_zoom' },
	intro: { name: 'intro_tuto', restart: true },
	tuto: { name: 'intro_tuto' },
	wait: { name: 'wait', restart: true },
	warning: { name: 'wait' },
	load: { name: 'load', restart: true },
	recap: { name: 'recap', restart: true },
	save: { name: 'save_rank', restart: true },
	rank: { name: 'save_rank' },
	end: { name: 'end', restart: true },
};

const stateVideosNames = U.filterOutDuplicates(Object.keys(stateVideos).map(key => {
	return stateVideos[key].name;
}));

const allVideosNames = [].concat(stateVideosNames).concat(universVideosNames);

const getVideo = (props) => {
	const status = props.game.get('status');
	return status !== 'play' ?
		stateVideos[status] : { name: props.choregraphy.get('name'), restart: true };
};

console.log(allVideosNames);

export class Video extends Component {
	constructor(props) {
		super(props);
		this.videoSynchronization = this.videoSynchronization.bind(this);
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
		const currentStatus = this.props.game.get('status');
		const nextStatus = nextProps.game.get('status');
		const currentVideo = getVideo(this.props);
		const nextVideo = getVideo(nextProps);

		if (
			currentStatus !== nextStatus &&
			nextVideo.restart
		) {
			if (nextVideo) {
				const nextVideoEl = this.refs[nextVideo.name];
				if (nextVideoEl) {
					nextVideoEl.currentTime = 0;
					nextVideoEl.play();
					nextVideoEl.classList.add(css.above);
				}
			}

			if (currentVideo) {
				const currentVideoEl = this.refs[currentVideo.name];
				if (
					currentVideoEl &&
					currentVideo.name &&
					nextVideo.name &&
					currentVideo.name !== nextVideo.name
				) {
					currentVideoEl.classList.remove(css.above);
					currentVideoEl.pause();
					currentVideoEl.currentTime = 0;
				}
			}
		}
	}
	videoSynchronization() {
		universVideosNames.forEach((name) => {
			const thisVideo = this.refs[name];
			thisVideo.addEventListener('play', (e) => {
				if (this.props.game.get('status') === 'play') {
					// FIXME: Find better way to sync video
					const delay = Date.now() - this.props.choregraphy.get('time') + 400;
					thisVideo.currentTime = delay / 1000;
				}
			});
		});
	}
	render() {
		const videosContent = allVideosNames.map((name) => {
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
					muted={this.props.admin.get('muted') || name === 'Last_Resistance'}
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
