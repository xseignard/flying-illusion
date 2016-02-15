import React, { Component } from 'react';
import THREE from 'three';

export default class Resources extends Component {
	constructor(props) {
		super(props);
		const arrowShape = new THREE.Shape();
		arrowShape.moveTo(-20, -20);
		arrowShape.moveTo(0, 20);
		arrowShape.moveTo(20, -20);
		arrowShape.moveTo(0, -12);
		this.arrowShapes = [
			arrowShape
		];
	}
	componentDidMount() {
		this.refs.leftArrowGeometry.rotateZ(Math.PI / 2);
		this.refs.topArrowGeometry.rotateZ(0);
		this.refs.bottomArrowGeometry.rotateZ(Math.PI);
		this.refs.rightArrowGeometry.rotateZ(Math.PI / -2);
	}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<resources>
				<extrudeGeometry
					ref="leftArrowGeometry"
					resourceId="leftArrowGeometry"
					shapes={this.arrowShapes}
					amount={0}
					bevelEnabled={false}
					bevelSegments={0}
					steps={0}
					bevelSize={0}
					bevelThickness={0}
				/>
				<extrudeGeometry
					ref="topArrowGeometry"
					resourceId="topArrowGeometry"
					shapes={this.arrowShapes}
					amount={0}
					bevelEnabled={false}
					bevelSegments={0}
					steps={0}
					bevelSize={0}
					bevelThickness={0}
				/>
				<extrudeGeometry
					ref="bottomArrowGeometry"
					resourceId="bottomArrowGeometry"
					shapes={this.arrowShapes}
					amount={0}
					bevelEnabled={false}
					bevelSegments={0}
					steps={0}
					bevelSize={0}
					bevelThickness={0}
				/>
				<extrudeGeometry
					ref="rightArrowGeometry"
					resourceId="rightArrowGeometry"
					shapes={this.arrowShapes}
					amount={0}
					bevelEnabled={false}
					bevelSegments={0}
					steps={0}
					bevelSize={0}
					bevelThickness={0}
				/>
				<meshBasicMaterial
					resourceId="moveMaterial"
					color={0x0089fe}
				/>
				<meshBasicMaterial
					resourceId="targetMaterial"
					color={0xffffff}
				/>
			</resources>
		);
	}
}
