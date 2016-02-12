import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';

export class Video extends Component {
	render() {
		return (
			<div className={css.video}>
				video
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game
	};
}

export default connect(mapStateToProps)(Video);
