import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';

export class Performance extends Component {
	shouldComponentUpdate(nextProps) {
		const tp = this.props.performance;
		const np = nextProps.performance;
		return (
			tp.score !== np.score ||
			tp.comments.last !== np.comments.last ||
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
				<h1>{this.props.performance.comments.last}</h1>
				<div className={css.combo}>
					<div className={css.label}>combo</div>
					<div className={css.amount}>X{this.props.performance.combo}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		performance: state.performance,
	};
};

export default connect(mapStateToProps)(Performance);
