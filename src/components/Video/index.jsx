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
		const nextVideo = this.refs[nextProps.game.get('status')];
		const currentVideo = this.refs[this.props.game.get('status')];
		if (nextVideo) {
			nextVideo.play();
			nextVideo.classList.add(css.above);
		}
		if (currentVideo) {
			currentVideo.classList.remove(css.above);
			currentVideo.pause();
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
		game: state.game,
		choregraphyName: state.choregraphy.get('name')
	};
}

export default connect(mapStateToProps)(Video);
