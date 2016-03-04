import React, { Component } from 'react';
import THREE from 'three';
import C from '../../constants';
import Resources from './common/Resources';
import Targets from './Targets';
import Moves from './Moves';

export default class Scene extends Component {
	constructor() {
		super();
		this.cameraPosition = new THREE.Vector3(0, 0, 1);
	}
	componentDidMount() {
		this.props.threeRefs.scene = this.refs.scene;
		this.props.threeRefs.camera = this.refs.camera;
	}
	render() {
		return (
			<scene ref="scene">
				<orthographicCamera
					ref="camera"
					name="camera"
					near={0.1}
					far={1000}
					left={C.APP_WIDTH / -2}
					right={C.APP_WIDTH / 2}
					top={C.APP_HEIGHT / 2}
					bottom={C.APP_HEIGHT / -2}
					position={this.cameraPosition}
				/>
				<Resources
					threeRefs={this.props.threeRefs}
				/>
				<Targets
					targetsRefs={this.props.targetsRefs}
				/>
				<Moves
					movesRefs={this.props.movesRefs}
					moves={this.props.moves}
				/>
			</scene>
		);
	}
}
