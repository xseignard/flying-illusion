import React, { Component } from 'react';
import THREE from 'three';
import C from '../../constants';
import U from '../../utils';
import Resources from './common/Resources';
import Targets from './Targets';
import Moves from './Moves';

export default class Scene extends Component {
	constructor() {
		super();
		this.cameraPosition = new THREE.Vector3(0, 0, 1);
	}
	render() {
		const playContent = !U.showWebgl(this.props.game) ? null : (
			<group>
				<Targets
					targetsRefs={this.props.targetsRefs}
				/>
				<Moves
					movesRefs={this.props.movesRefs}
					moves={this.props.moves}
				/>
			</group>
		);
		return (
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
				{playContent}
			</scene>
		);
	}
}
