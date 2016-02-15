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
	shouldComponentUpdate(nextProps) {
		return false;
	}
	render() {
		const content = this.gameStates.map((state) => {
			const src = `videos/${state}.mp4`;
			return (
				<video
					ref={state}
					key={state}
					src={src}
					width={C.APP_WIDTH}
					height={C.APP_HEIGHT}
					loop
				></video>
			);
		});
		return (
			<div className={css.video}>
				{content}
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
