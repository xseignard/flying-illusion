import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import C from '../../constants';
import * as gameActions from '../../actions/game';
import { getShowMoves } from '../../selectors/moves';
import Scene from './Scene';

export class Webgl extends Component {
	constructor(props) {
		super(props);
		this._onAnimate = this._onAnimate.bind(this);
		this.state = {
			startTime: this.props.game.get('time'),
			gameTime: 0
		};
	}
	componentWillUnmount() {
		this.props.stopGame();
	}
	_onAnimate() {
		this.setState({ gameTime: Date.now() - this.state.startTime });
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
					moves={this.props.moves}
					gameTime={this.state.gameTime}
				/>
			</React3>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
		moves: getShowMoves(state)
	};
}

export default connect(mapStateToProps, gameActions)(Webgl);
