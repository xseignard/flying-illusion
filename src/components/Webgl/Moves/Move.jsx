import React, { Component } from 'react';
import { getPosition } from '../common/helpers';

export class Move extends Component {
	constructor(props) {
		super(props);
		this.position = getPosition('move', this.props.move.direction);
		this.geometry = `geometry_move_${this.props.move.direction}`;
		this.material = `material_move_${this.props.move.direction}`;
		this.textureId = this.props.move.direction.match(/top|bottom/) ?
			'top_bottom' :
			'left_right';
		const rotations = {
			left: Math.PI / -2,
			top: Math.PI,
			bottom: 0,
			right: Math.PI / 2
		};
		this.rotation = rotations[this.props.move.direction];
	}
	componentDidMount() {
		this.props.movesRefs[this.props.move.id] = {
			mesh: this.refs.move,
			material: this.refs.material,
			geometry: this.refs.geometry,
		};
		this.refs.geometry.rotateZ(this.rotation);
	}
	shouldComponentUpdate(nextProps) {
		return false;
	}
	render() {
		return (
			<group>
				<mesh
					ref="move"
					position={this.position}
				>
					<planeGeometry ref="geometry" width={128} height={128} />
					<meshBasicMaterial ref="material" transparent>
						<textureResource resourceId={`texture_move_${this.textureId}`} />
					</meshBasicMaterial>
				</mesh>
			</group>
		);
	}
}
