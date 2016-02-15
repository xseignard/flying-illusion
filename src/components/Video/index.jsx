import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
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
			muted: false
		};
		this.toggleSound = this.toggleSound.bind(this);
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
	toggleSound() {
		this.setState({
			muted: !this.state.muted
		});
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
		const audioContent = !this.props.choregraphyName ? null : (
			<audio
				ref="audio"
				autoPlay
				muted={this.state.muted}
				src={`choregraphies/${this.props.choregraphyName}.mp3`}
			>
			</audio>
		);
		const soundClass = classnames({
			[css.sound]: true,
			[css.muted]: this.state.muted
		});
		const soundText = this.state.muted ? 'Sound off' : 'Sound on';
		return (
			<div className={css.video}>
				{videosContent}
				{audioContent}
				<div
					className={soundClass}
					onClick={this.toggleSound}
				>
					{soundText}
				</div>
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
