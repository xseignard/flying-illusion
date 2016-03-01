import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';

export class Audio extends Component {
	constructor(props) {
		super(props);
		this.getAudioSrc = this.getAudioSrc.bind(this);
	}
	componentDidMount() {
		this.refs.audio.addEventListener('play', () => {
			const delay = Date.now() - this.props.choregraphy.get('time');
			this.refs.audio.currentTime = delay / 1000;
			this.refs.audio.muted = this.props.admin.get('muted');
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
	render() {
		const audioSrc = this.getAudioSrc();
		return (
			<div className={css.audio}>
				<audio
					ref="audio"
					src={audioSrc}
					autoPlay
					muted={this.props.admin.get('muted')}
				>
				</audio>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		admin: state.admin,
		game: state.game,
		choregraphy: state.choregraphy,
		choregraphyName: state.choregraphy.get('name')
	};
};

export default connect(mapStateToProps)(Audio);
