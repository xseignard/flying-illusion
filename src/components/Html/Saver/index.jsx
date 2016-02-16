import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveRank } from '../../../actions/ranks';
import { getPerformance } from '../../../selectors/performance';
import css from './css';

export class Saver extends Component {
	constructor(props) {
		super(props);
		this.saveName = this.saveName.bind(this);
	}
	shouldComponentUpdate(nextProps) {
	}
	saveName() {
		if (this.refs.name.validity.valid) {
			console.log('correct input');
			this.props.saveRank({
				name: this.refs.name.value,
				performance: this.props.performance
			});
		}
	}
	render() {
		return (
			<div className={css.saver}>
				score: {this.props.performance.score} <br />
				ok: {this.props.performance.ok} <br />
				good: {this.props.performance.good} <br />
				excellent: {this.props.performance.excellent} <br /><br />
				<input
					autoFocus
					ref="name"
					required
					type="text"
					minLength="3"
					maxLength="3"
					pattern="[a-z]+"
				/>
			<button onClick={this.saveName}>Start new game</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		performance: getPerformance(state),
	};
}

export default connect(mapStateToProps, { saveRank })(Saver);
