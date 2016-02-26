import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPerformance } from '../../../../selectors/performance';
import { Metric } from './Metric';
import Text from '../../Text';
import css from './css';

export class Recap extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={css.recap}>
				<div
					className={css.excellent}
				>
					<Metric
						label="EXCELLENT"
						value={this.props.performance.commentsCount.excellent}
					/>
				</div>
				<div
					className={css.good}
				>
					<Metric
						label="BIEN"
						value={this.props.performance.commentsCount.good}
					/>
				</div>
				<div
					className={css.ok}
				>
					<Metric
						label="OK"
						value={this.props.performance.commentsCount.ok}
					/>
				</div>
				<div
					className={css.combo}
				>
					<Metric
						label="COMBO"
						value={this.props.performance.commentsCount.combo}
					/>
				</div>
				<div className={css.hint}>
					<Text text="APPUYEZ SUR"/>
					<div className={css.arrow}></div>
					<Text text="POUR ENREGISTRER VOTRE SCORE"/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		performance: getPerformance(state),
	};
}

export default connect(mapStateToProps)(Recap);
