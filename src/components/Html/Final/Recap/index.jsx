import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPerformance } from '../../../../selectors/performance';
import css from './css';

export class Recap extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={css.recap}>
				score: {this.props.performance.score} <br />
				ok: {this.props.performance.ok} <br />
				good: {this.props.performance.good} <br />
				excellent: {this.props.performance.excellent} <br /><br />
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
