import React, { Component } from 'react';
import { TargetStep } from '../../components/TargetStep';
import css from './css';

export class GameHeader extends Component {
	targetStepsList() {
		return this.props.targetSteps.map((step, index) => {
			return <TargetStep key={index} step={step} />;
		});
	}
	render() {
		this.targetSteps = this.targetStepsList();
		return (
			<div className={css.gameHeader}>
				<div className={css.arrow}>left</div>
				<div className={css.arrow}>top</div>
				<div className={css.arrow}>bottom</div>
				<div className={css.arrow}>right</div>
				<div className={css.targetSteps}>
					{this.targetSteps}
				</div>
			</div>
		);
	}
}
