import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isGame } from '../../utils';
import * as gameActions from '../../actions/game';
import Header from './Header';
import Performance from './Performance';
import Saver from './Saver';
import Ranks from './Ranks';
import css from './css';

export class Html extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const performanceContent = !isGame(this.props.game) ? null : (
			<Performance />
		);
		const saverContent = this.props.game.get('status') !== 'save' ? null : (
			<Saver />
		);
		const ranksContent = this.props.game.get('status') !== 'rank' ? null : (
			<Ranks />
		);
		return (
			<div className={css.html}>
				<Header
					game={this.props.game}
					launchPlay={this.props.launchPlay}
				/>
				{performanceContent}
				{saverContent}
				{ranksContent}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
	};
}

export default connect(mapStateToProps, gameActions)(Html);
