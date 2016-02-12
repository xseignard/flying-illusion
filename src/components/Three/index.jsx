import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import C from '../../constants';
import * as gameActions from '../../actions/game';
import { getShowMoves } from '../../selectors/moves';
import Scene from './Scene';

export class Three extends Component {
	constructor() {
		super();
		this._onAnimate = this._onAnimate.bind(this);
		this.state = { frameNumber: 0 };
	}
	componentDidMount() {
		// FOR DEV PURPOSES, GAME CAN BE STARTED IMMEDIATELY
		if (this.props.game.get('status') === 'dev') {
			this.props.startGame();
		}
	}
	componentWillUnmount() {
		this.props.stopGame();
	}
	_onAnimate() {
		this.setState({ frameNumber: this.state.frameNumber + 1 });
	}
	render() {
		if (this.props.game.get('status') !== 'play') {
			return null;
		}
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
					frameNumber={this.state.frameNumber}
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

export default connect(mapStateToProps, gameActions)(Three);
