import React, { Component } from 'react';
import { connect } from 'react-redux';
import Isvg from 'react-inlinesvg';
import * as gameActions from '../../../actions/game';
import css from './css';
import Headline from './Headline';

export class Header extends Component {
	constructor() {
		super();
	}
	shouldComponentUpdate(nextProps) {
		return nextProps.game.get('status') !== this.props.game.get('status');
	}
	render() {
		if (this.props && this.props.game && this.props.game.get('status') === 'play') {
			// waiting for react 0.15 to be allowed to return null
			return (
				<noscript />
			);
		}
		return (
			<div className={css.header}>
				<div className={css.logo}>
					<Isvg src="img/logo.svg" />
				</div>
				<Headline
					game={this.props.game}
					startGame={this.props.startGame}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
	};
}

export default connect(mapStateToProps, gameActions)(Header);
