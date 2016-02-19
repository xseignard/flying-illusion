import React, { Component } from 'react';
import { getPosition } from '../common/helpers';

export class Move extends Component {
	constructor(props) {
		super(props);
		this.geometry = `geometry_move_${this.props.move.direction}`;
		this.material = `material_move_${this.props.move.direction}`;
		this.state = {
			position: getPosition(
				'move',
				this.props.move.direction,
				this.props.move.showTime,
				this.props.gameTime,
			)
		};
	}
	componentDidMount() {
		// Another possibility to animate elements is to use
		// native Three methods on this.refs.move here
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.gameTime !== nextProps.gameTime) {
			this.setState({
				position: getPosition(
					'move',
					this.props.move.direction,
					this.props.move.showTime,
					this.props.gameTime,
				)
			});
		}
	}
	shouldComponentUpdate(nextProps) {
		return this.props.gameTime !== nextProps.gameTime;
	}
	render() {
		return (
			<mesh position={this.state.position}>
				<geometryResource resourceId={this.geometry} />
				<materialResource resourceId={this.material} />
			</mesh>
		);
	}
}
