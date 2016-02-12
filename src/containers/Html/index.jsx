import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from '../../components/Header';
import Performance from './Performance';
import css from './css';

export default class Html extends Component {
	render() {
		return (
			<div className={css.html}>
				<Header game={this.props.game}/>
				<Performance />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
	};
}

export default connect(mapStateToProps)(Html);
