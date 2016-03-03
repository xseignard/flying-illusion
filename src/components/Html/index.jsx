import React, { Component } from 'react';
import { connect } from 'react-redux';
import Idle from './Idle';
import Zoom from './Zoom';
import TutoPlay from './TutoPlay';
import Wait from './Wait';
import Warning from './Warning';
import Recap from './Recap';
import Save from './Save';
import Rank from './Rank';
import End from './End';
import css from './css';

const mapStatusToTag = {
	idle: <Idle />,
	zoom: <Zoom />,
	intro: <noscript />,
	tuto: <TutoPlay />,
	wait: <Wait />,
	warning: <Warning />,
	load: <noscript />,
	play: <TutoPlay />,
	recap: <Recap />,
	save: <Save />,
	rank: <Rank />,
	end: <End />,
};

export class Html extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const content = mapStatusToTag[this.props.game.get('status')];
		return (
			<div className={css.html}>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		game: state.game,
	};
};

export default connect(mapStateToProps)(Html);
