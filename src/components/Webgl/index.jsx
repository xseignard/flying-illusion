import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import C from '../../constants';
import * as gameActions from '../../actions/game';
import { getVisibleMoves } from '../../selectors/moves';
import { getTranslation } from './common/helpers';
import Scene from './Scene';

export class Webgl extends Component {
	constructor(props) {
		super(props);
		this._onAnimate = this._onAnimate.bind(this);
		this.choregraphyTime = this.props.choregraphy.get('time');
		this.sceneMoves = new Map();
	}
	_onAnimate() {
		this.gameTime = Date.now() - this.choregraphyTime;
		this.sceneMoves.forEach((move) => {
			move.ref.translateY(getTranslation(
				move.ref.position.y,
				move.showTime,
				this.gameTime,
			));
		});
	}
	render() {
		return (
			<React3
				mainCamera="camera"
				width={C.APP_WIDTH}
				height={C.APP_HEIGHT}
				alpha
				clearAlpha={0}
				onAnimate={this._onAnimate}
				antialias
			>
				<Scene
					sceneMoves={this.sceneMoves}
					game={this.props.game}
					moves={this.props.moves}
				/>
			</React3>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
		choregraphy: state.choregraphy,
		moves: getVisibleMoves(state)
	};
}

export default connect(mapStateToProps, gameActions)(Webgl);
