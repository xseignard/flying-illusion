import React, { Component } from 'react';
import { getPosition, getGeometry } from '../common/helpers';

export class Target extends Component {
	constructor(props) {
		super(props);
		this.position = getPosition(this.props.target);
		this.geometry = getGeometry(this.props.target);
	}
	shouldComponentUpdate(nextProps) {
		return false;
	}
	render() {
		return (
			<mesh position={this.position.position}>
				<geometryResource resourceId={this.geometry} />
				<materialResource resourceId="targetMaterial" />
			</mesh>
		);
	}
}
