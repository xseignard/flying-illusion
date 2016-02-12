import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import THREE from 'three';
import C from '../../constants';
import * as gameActions from '../../actions/game';
import { getShowMoves } from '../../selectors/moves';
import Resources from './common/Resources';
import Targets from './Targets';
import Moves from './Moves';

export class Three extends Component {
	constructor() {
		super();
		this.didMount = false;
		this.cameraPosition = new THREE.Vector3(0, 0, 1);
		this._onAnimate = this._onAnimate.bind(this);
		this.state = { frameNumber: 0 };
	}
	componentDidMount() {
		this.didMount = true;
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
				<scene>
					<orthographicCamera
						name="camera"
						near={0.1}
						far={1000}
						left={C.APP_WIDTH / -2}
						right={C.APP_WIDTH / 2}
						top={C.APP_HEIGHT / 2}
						bottom={C.APP_HEIGHT / -2}
						position={this.cameraPosition}
					/>
					<Resources />
					<Targets />
					<Moves
						moves={this.props.moves}
						frameNumber={this.state.frameNumber}
					/>
				</scene>
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
