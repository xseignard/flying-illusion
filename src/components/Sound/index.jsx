import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';

/*
Quant tu synch avec < et >
- Quand le jeu s’arrete et l’ecran fin de partie s’arrete
- Quand on fait apparaitre le leaderboard apres avoir rentré le nom
*/

export class Sound extends Component {
	constructor(props) {
		super(props);
		this.sounds = new Howl({
			urls: ['sounds/sounds.mp3'],
			sprite: {
				enter: [1343, 2657],
				fail: [0, 343],
				pad: [8708, 678],
				transition: [4976, 2800]
			}
		});
		this.oneIsDown = this.oneIsDown.bind(this);
		this.canPlayFail = true;
	}
	componentWillReceiveProps(nextProps) {
		if (
			this.props.status !== nextProps.status &&
			nextProps.status === 'intro'
		) {
			this.sounds.play('enter');
		}
		else if (
			this.props.status !== nextProps.status &&
			nextProps.status.match(/warning|load|recap|end/)
		) {
			this.sounds.play('transition');
		}
		else if (
			this.props.status === 'play' &&
			nextProps.status === 'play' &&
			nextProps.fail > this.props.fail &&
			this.canPlayFail
		) {
			this.canPlayFail = false;
			this.sounds.play('fail');
			setTimeout(() => {
				this.canPlayFail = true;
			}, 2000);
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
