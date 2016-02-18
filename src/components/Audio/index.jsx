import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class Audio extends Component {
	constructor(props) {
		super(props);
		this.toggleSound = this.toggleSound.bind(this);
		this.getAudioSrc = this.getAudioSrc.bind(this);
		this.state = { muted: true };
	}
	componentDidMount() {
		this.refs.audio.addEventListener('play', () => {
			const delay = Date.now() - this.props.choregraphy.get('time');
			this.refs.audio.currentTime = delay / 1000;
			this.refs.audio.muted = this.state.muted;
		});
	}
	getAudioSrc() {
		if (
			this.props.game.get('status') !== 'play' ||
			!this.props.choregraphyName
		) {
			return null;
		}
		return `choregraphies/${this.props.choregraphyName}.mp3`;
	}
	toggleSound() {
		this.setState({ muted: !this.state.muted });
	}
	render() {
		const audioSrc = this.getAudioSrc();
		const soundClass = classnames({
			[css.sound]: true,
			[css.muted]: this.state.muted
		});
		const soundText = this.state.muted ? 'Sound off' : 'Sound on';
		return (
			<div>
				<audio
					ref="audio"
					src={audioSrc}
					autoPlay
					muted={this.state.muted}
				>
				</audio>
				<div className={soundClass} onClick={this.toggleSound}>
					{soundText}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
		choregraphy: state.choregraphy,
		choregraphyName: state.choregraphy.get('name')
	};
}

export default connect(mapStateToProps)(Audio);
