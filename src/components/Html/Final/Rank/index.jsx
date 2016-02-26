import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSortedRecords } from '../../../../selectors/records';
import css from './css';

export class Rank extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const recordsContent = this.props.records.map((record, index) => {
			return (
				<div key={index}>
					{record.player} : {record.score}
				</div>
			);
		});
		return (
			<div className={css.rank}>
				<div className={css.records}>
					{recordsContent}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		records: getSortedRecords(state),
	};
}

export default connect(mapStateToProps)(Rank);
