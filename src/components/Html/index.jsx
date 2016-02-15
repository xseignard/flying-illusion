import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/game';
import Header from './Header';
import Performance from './Performance';
import css from './css';

export class Html extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const performanceContent = this.props.game.get('status') !== 'play' ? null : (
			<Performance />
		);
		return (
			<div className={css.html}>
				<Header
					game={this.props.game}
					startGame={this.props.startGame}
				/>
				{performanceContent}
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
