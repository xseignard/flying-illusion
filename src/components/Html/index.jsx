import React, { Component } from 'react';
import { connect } from 'react-redux';
import Assets from './Assets';
import Idle from './Idle';
import Zoom from './Zoom';
import Tuto from './Tuto';
import Wait from './Wait';
import Warning from './Warning';
import Play from './Play';
import Recap from './Recap';
import Save from './Save';
import Rank from './Rank';
import css from './css';

const mapStatusToTag = {
	assets: <Assets />,
	idle: <Idle />,
	zoom: <Zoom />,
	intro: <noscript />,
	tuto: <Tuto />,
	wait: <Wait />,
	warning: <Warning />,
	load: <noscript />,
	play: <Play />,
	recap: <Recap />,
	save: <Save />,
	rank: <Rank />,
	end: <noscript />,
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
