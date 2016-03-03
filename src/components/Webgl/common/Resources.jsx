import React, { Component } from 'react';
import THREE from 'three';

export default class Resources extends Component {
	constructor(props) {
		super(props);
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
					resourceId="texture_target_right"
					url="img/target_right.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
				<texture
					resourceId="texture_target_bottom"
					url="img/target_bottom.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
				<meshBasicMaterial transparent resourceId="material_target_left">
					<textureResource resourceId="texture_target_left" />
				</meshBasicMaterial>
				<meshBasicMaterial transparent resourceId="material_target_top">
					<textureResource resourceId="texture_target_top" />
				</meshBasicMaterial>
				<meshBasicMaterial transparent resourceId="material_target_right">
					<textureResource resourceId="texture_target_right" />
				</meshBasicMaterial>
				<meshBasicMaterial transparent resourceId="material_target_bottom">
					<textureResource resourceId="texture_target_bottom" />
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
					ref="geometry_target_right"
					resourceId="geometry_target_right"
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
					resourceId="sprite_geometry"
					width={256}
					height={256}
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
				<texture
					resourceId="texture_hit_top_bottom"
					url="img/hit_top_bottom.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
				<texture
					resourceId="texture_hit_left_right"
					url="img/hit_left_right.png"
					wrapS={THREE.RepeatWrapping}
					wrapT={THREE.RepeatWrapping}
				/>
			</resources>
		);
	}
}
