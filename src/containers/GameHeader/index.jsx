import React, { Component } from 'react';
import { TargetStep } from '../../components/TargetStep';
import css from './css';

export class GameHeader extends Component {
	choregraphyStepsList() {
		return this.props.choregraphySteps.map((step, index) => {
			return <TargetStep key={index} step={step} />;
		});
	}
	render() {
		this.choregraphySteps = this.choregraphyStepsList();
		return (
			<div className={css.gameHeader}>
				<div className={css.arrow}></div>
				<div className={css.arrow}></div>
				<div className={css.arrow}></div>
				<div className={css.arrow}></div>
				<div className={css.choregraphySteps}>
					{this.choregraphySteps}
				</div>
			</div>
		);
	}
}
