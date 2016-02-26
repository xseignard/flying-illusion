import React, { Component } from 'react';
import Text from '../../../Text';
import css from './css';

export class Metric extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}
	render() {
		return (
			<div className={css.metric}>
				<div>
					<Text
						className={css.label}
						text={this.props.label}
					/>
				</div>
				<div
					ref="scale"
					className={css.scale}
				></div>
				<div className={css.value}>
					{this.props.value}
				</div>
			</div>
		);
	}
}
