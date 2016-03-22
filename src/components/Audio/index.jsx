import React, { Component } from 'react';
import { connect } from 'react-redux';
import Buzz from 'buzz';

export class Audio extends Component {
	constructor(props) {
		super(props);
		this.audio = new Buzz.sound('choregraphies/The_Flying_Heroes_tuto.mp3');
	}
	componentWillReceiveProps(nextProps) {
		if (
			nextProps.game.get('status').match(/idle|load/) &&
			this.props.game.get('status') !== 'assets'
		) {
			console.log('fade');
			this.audio.fadeOut(1000, () => {
				console.log('stop');
				this.audio.stop();
			});
		}
		else if (nextProps.game.get('status').match(/tuto|recap/)) {
			this.audio.stop();
			this.audio.setVolume(40);
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
