import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPerformance } from '../../../selectors/performance';
import css from './css';

export class Performance extends Component {
	shouldComponentUpdate(nextProps) {
		const tp = this.props.performance;
		const np = nextProps.performance;
		return (
			tp.score !== np.score ||
			tp.comment !== np.comment ||
			tp.combo !== np.combo
		);
	}
	render() {
		return (
			<div className={css.performance}>
				<div className={css.score}>
					<div className={css.label}>score</div>
					<div className={css.amount}>{this.props.performance.score}</div>
				</div>
				<h1>{this.props.performance.comment}</h1>
				<div className={css.combo}>
					<div className={css.label}>combo</div>
					<div className={css.amount}>X{this.props.performance.combo}</div>
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

export default connect(mapStateToProps)(Performance);
