import React, { Component } from 'react';
import { getPosition, getGeometry } from '../common/helpers';

export class Target extends Component {
	constructor(props) {
		super(props);
		this.position = getPosition('target', this.props.target.direction);
		this.geometry = getGeometry(this.props.target);
	}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<mesh position={this.position}>
				<geometryResource resourceId={this.geometry} />
				<materialResource resourceId="targetMaterial" />
			</mesh>
		);
	}
}
