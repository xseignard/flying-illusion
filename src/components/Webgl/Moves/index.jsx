import React, { Component } from 'react';
import { Move } from './Move';

export default class Moves extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (!this.props.moves) {
			return <group></group>;
		}
		return (
			<group>
				{this.props.moves.map((move) => {
					return (
						<Move
							gameTime={this.props.gameTime}
							key={move.time + move.direction}
							move={move}
						/>
					);
				})}
			</group>
		);
	}
}