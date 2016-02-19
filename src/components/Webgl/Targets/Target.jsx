import React, { Component } from 'react';
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
			<mesh position={this.position}>
				<geometryResource resourceId={this.geometry} />
				<materialResource resourceId={this.material} />
			</mesh>
		);
	}
}
