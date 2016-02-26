import React, { Component } from 'react';
import { Sprite } from './Sprite';
import { getPosition } from '../common/helpers';

export class Target extends Component {
	constructor(props) {
		super(props);
		this.position = getPosition('target', this.props.target.direction);
		this.geometry = `geometry_target_${this.props.target.direction}`;
		this.material = `material_target_${this.props.target.direction}`;
	}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<group>
				<mesh position={this.position}>
					<geometryResource resourceId={this.geometry} />
					<materialResource resourceId={this.material} />
				</mesh>
				<Sprite
					direction={this.props.target.direction}
					ref="sprite"
					hTiles={8}
					vTiles={9}
					sceneTargets={this.props.sceneTargets}
				/>
			</group>
		);
	}
}
