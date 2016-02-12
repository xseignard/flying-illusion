import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import THREE from 'three';
import { getShowMoves } from '../../selectors/moves';
import * as gameActions from '../../actions/game';
import Resources from './common/Resources';
import Targets from './Targets';
import Moves from './Moves';

export class Three extends Component {
	constructor() {
		super();
		this.didMount = false;
		this.cameraPosition = new THREE.Vector3(0, 0, 1);
		this._onAnimate = this._onAnimate.bind(this);
		this.state = {
			frameNumber: 0
		};
	}
	componentDidMount() {
		this.didMount = true;
		// FOR DEV PURPOSES, GAME CAN BE STARTED IMMEDIATELY
		if (this.props.game.get('status') === 'dev') {
			this.props.startGame();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (
			nextProps.game.get('status') === 'play' &&
			this.props.game.get('status') === 'load'
		) {
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
		const width = 1920;
		const height = 1080;

		return (
			<React3
				mainCamera="camera"
				width={width}
				height={height}
				alpha="false"
				onAnimate={this._onAnimate}
				antialias
			>
				<scene>
					<orthographicCamera
						name="camera"
						near={0.1}
						far={1000}
						left={-width / 2}
						right={width / 2}
						top={height / 2}
						bottom={-height / 2}
						position={this.cameraPosition}
					/>
					<Resources />
					<Targets />
					<Moves
						frameNumber={this.state.frameNumber}
						moves={this.props.moves}
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
