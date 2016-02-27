import React, { Component } from 'react';
import THREE from 'three';

export default class Resources extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.refs.geometry_move_left.rotateZ(Math.PI / -2);
		this.refs.geometry_move_top.rotateZ(Math.PI);
		this.refs.geometry_move_bottom.rotateZ(0);
		this.refs.geometry_move_right.rotateZ(Math.PI / 2);
	}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<resources>
				<texture
					resourceId="texture_target_left"
					url="img/target_left.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
				<texture
					resourceId="texture_target_top"
					url="img/target_top.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
				<texture
					resourceId="texture_target_bottom"
					url="img/target_bottom.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
				<texture
					resourceId="texture_target_right"
					url="img/target_right.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
				<meshBasicMaterial alphaTest={0.5} resourceId="material_target_left">
					<textureResource resourceId="texture_target_left" />
				</meshBasicMaterial>
				<meshBasicMaterial alphaTest={0.5} resourceId="material_target_top">
					<textureResource resourceId="texture_target_top" />
				</meshBasicMaterial>
				<meshBasicMaterial alphaTest={0.5} resourceId="material_target_bottom">
					<textureResource resourceId="texture_target_bottom" />
				</meshBasicMaterial>
				<meshBasicMaterial alphaTest={0.5} resourceId="material_target_right">
					<textureResource resourceId="texture_target_right" />
				</meshBasicMaterial>
				<planeGeometry
					ref="geometry_target_left"
					resourceId="geometry_target_left"
					width={128}
					height={128}
				/>
				<planeGeometry
					ref="geometry_target_top"
					resourceId="geometry_target_top"
					width={128}
					height={128}
				/>
				<planeGeometry
					ref="geometry_target_bottom"
					resourceId="geometry_target_bottom"
					width={128}
					height={128}
				/>
				<planeGeometry
					ref="geometry_target_right"
					resourceId="geometry_target_right"
					width={128}
					height={128}
				/>
				<texture
					resourceId="texture_move_left_right"
					url="img/move_left_right.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
				<texture
					resourceId="texture_move_top_bottom"
					url="img/move_top_bottom.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
			<meshBasicMaterial alphaTest={0.5} resourceId="material_move_left">
					<textureResource resourceId="texture_move_left_right" />
				</meshBasicMaterial>
				<meshBasicMaterial alphaTest={0.5} resourceId="material_move_top">
					<textureResource resourceId="texture_move_top_bottom" />
				</meshBasicMaterial>
				<meshBasicMaterial alphaTest={0.5} resourceId="material_move_bottom">
					<textureResource resourceId="texture_move_top_bottom" />
				</meshBasicMaterial>
				<meshBasicMaterial alphaTest={0.5} resourceId="material_move_right">
					<textureResource resourceId="texture_move_left_right" />
				</meshBasicMaterial>
				<planeGeometry
					ref="geometry_move_left"
					resourceId="geometry_move_left"
					width={128}
					height={128}
				/>
				<planeGeometry
					ref="geometry_move_top"
					resourceId="geometry_move_top"
					width={128}
					height={128}
				/>
				<planeGeometry
					ref="geometry_move_bottom"
					resourceId="geometry_move_bottom"
					width={128}
					height={128}
				/>
				<planeGeometry
					ref="geometry_move_right"
					resourceId="geometry_move_right"
					width={128}
					height={128}
				/>
			</resources>
		);
	}
}
