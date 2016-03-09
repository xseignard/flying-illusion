import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';

export class Sound extends Component {
	constructor(props) {
		super(props);
		this.sounds = new Howl({
			urls: ['sounds/sounds.ogg'],
			sprite: {
				enter: [0, 2000],
				fail: [3000, 700],
				pad: [5000, 300]
			}
		});
		this.oneIsDown = this.oneIsDown.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (
			this.props.status !== nextProps.status &&
			nextProps.status === 'intro'
		) {
			this.sounds.play('enter');
		}
		else if (
			this.props.status === 'play' &&
			nextProps.status === 'play' &&
			nextProps.fail > this.props.fail
		) {
			this.sounds.play('fail');
		}
		else if (
			this.props.status.match(/recap|save|rank|end/) &&
			nextProps.status !== 'idle' &&
			this.props.pads !== nextProps.pads &&
			this.oneIsDown(nextProps.pads)
		) {
			this.sounds.play('pad');
		}
	}
	oneIsDown(pads) {
		return ['left', 'top', 'bottom', 'right'].some((dir) => {
			return pads.get(dir) === 'down';
		});
	}
	render() {
		return <noscript />;
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.game.get('status'),
		pads: state.pads,
		fail: state.dance.get('fail'),
		admin: state.admin
	};
};

export default connect(mapStateToProps)(Sound);
