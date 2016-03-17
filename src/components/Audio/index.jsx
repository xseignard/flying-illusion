import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';

export class Audio extends Component {
	constructor(props) {
		super(props);
		this.audio = new Howl({
			urls: ['choregraphies/The_Flying_Heroes_tuto.mp3']
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.game.get('status').match(/idle|load/)) {
			this.audio.fade(0.4, 0, 1000, () => {
				this.audio.stop();
			});
			// FIXME: shouldn't be necessary
			setTimeout(() => {
				this.audio.stop();
				// this.audio.volume(0.0);
			}, 1200);
		}
		else if (nextProps.game.get('status').match(/tuto|recap/)) {
			this.audio.volume(0.4);
			this.audio.play();
		}
	}

	render() {
		return <noscript />;
	}
}

const mapStateToProps = (state) => {
	return {
		admin: state.admin,
		game: state.game
	};
};

export default connect(mapStateToProps)(Audio);
