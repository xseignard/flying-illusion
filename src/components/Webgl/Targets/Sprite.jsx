import React, { Component } from 'react';
import THREE from 'three';
import { getPosition } from '../common/helpers';

export class Sprite extends Component {
	constructor(props, context) {
		super(props, context);
		this.position = getPosition('target', this.props.direction);
		this.repeat = new THREE.Vector2(1 / 8, 1 / 9);
		const color = this.props.direction.match(/left|right/) ? 'blue' : 'red';
		this.sprite = `img/target_sprites_${color}.png`;
	}
	componentDidMount() {
		this.props.targetsRefs[this.props.direction] = {
			texture: this.refs.texture,
			material: this.refs.material,
		};
	}
	shouldComponentUpdate(nextProps) {
		return false;
	}
	render() {
		return (
			<group>
				<resources>
					<texture
						ref="texture"
						resourceId="sprite_texture"
						url={this.sprite}
						wrapS={THREE.RepeatWrapping}
						wrapT={THREE.RepeatWrapping}
						repeat={this.repeat}
						offset={new THREE.Vector2(0, 0)}
					/>
					<meshBasicMaterial
						ref="material"
						opacity={0}
						transparent
						resourceId="sprite_material"
					>
						<textureResource resourceId="sprite_texture" />
					</meshBasicMaterial>
				</resources>
				<mesh position={this.position}>
					<geometryResource resourceId="sprite_geometry" />
					<materialResource resourceId="sprite_material" />
				</mesh>
			</group>
		);
	}
}
