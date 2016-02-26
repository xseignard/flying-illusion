import React, { Component } from 'react';
import { Target } from './Target';

export default class Targets extends Component {
	constructor(props) {
		super(props);
		this.targets = [
			{ direction: 'left' },
			{ direction: 'top' },
			{ direction: 'bottom' },
			{ direction: 'right' }
		];
	}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<group>
				{this.targets.map((target, index) => {
					return (
						<Target
							key={index}
							target={target}
							sceneTargets={this.props.sceneTargets}
						/>
					);
				})}
			</group>
		);
	}
}
