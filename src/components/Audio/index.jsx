import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';

export class Audio extends Component {
	constructor(props) {
		super(props);
		this.audio = new Howl({
			urls: ['choregraphies/The_Flying_Heroes.mp3']
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.game.get('status').match(/idle|play/)) {
			this.audio.fade(1, 0, 1000, () => {
				this.audio.stop();
			});
		}
		else if (nextProps.game.get('status').match(/tuto|recap/)) {
			this.audio.volume(1);
			this.audio.play();
		}
	}
	// shouldComponentUpdate(nextProps) {
	// 	return nextProps.game.get('status').match(/idle|tuto|play|recap/);
	// }
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
