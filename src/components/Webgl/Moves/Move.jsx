import React, { Component } from 'react';
import { getPosition } from '../common/helpers';

export class Move extends Component {
	constructor(props) {
		super(props);
		this.position = getPosition('move', this.props.move.direction);
		this.geometry = `geometry_move_${this.props.move.direction}`;
		this.material = `material_move_${this.props.move.direction}`;
	}
	componentDidMount() {
		this.props.sceneMoves[this.props.move.id] = this.refs.move;
	}
	shouldComponentUpdate(nextProps) {
		return false;
	}
	componentWillUnmount() {
		this.props.sceneMoves[this.props.key] = undefined;
	}
	render() {
		return (
			<mesh
				ref="move"
				position={this.position}
			>
				<geometryResource resourceId={this.geometry} />
				<materialResource resourceId={this.material} />
			</mesh>
		);
	}
}