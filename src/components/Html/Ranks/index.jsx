import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearRanks } from '../../../actions/ranks';
import css from './css';

export class Ranks extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const ranks = this.props.ranks.map((rank, index) => {
			return (
				<div key={index}>
					{rank.name} : {rank.score}
				</div>
			);
		});
		return (
			<div className={css.ranks}>
				{ranks}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		ranks: state.ranks,
	};
}

export default connect(mapStateToProps, { clearRanks })(Ranks);
