import React, { Component } from 'react';
import THREE from 'three';
import { distancePerFrame, getPosition, getGeometry } from '../common/helpers';

export class Move extends Component {
	constructor(props) {
		super(props);
		this.state = getPosition(this.props.move, true);
		this.geometry = getGeometry(this.props.move);
	}
	componentDidMount() {
		// Another possibility to animate elements is to use
		// native Three methods on this.refs.move here
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.frameNumber !== nextProps.frameNumber) {
			const nextY = this.state.y + distancePerFrame;
			this.setState({
				y: nextY,
				position: new THREE.Vector3(this.state.x, nextY, 0)
			});
		}
	}
	shouldComponentUpdate(nextProps) {
		return this.props.frameNumber !== nextProps.frameNumber;
	}
	render() {
		return (
			<mesh position={this.state.position}>
				<geometryResource resourceId={this.geometry} />
				<materialResource resourceId="moveMaterial" />
			</mesh>
		);
	}
}
