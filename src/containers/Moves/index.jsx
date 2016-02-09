import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';
import { Move } from '../Move';

export class Moves extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (!this.props.choregraphy) {
			return null;
		}
		return (
			<div className={css.moves}>
				{this.props.choregraphy.map((move, index) => {
					return <Move key={index} move={move} />;
				})}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		choregraphy: state.choregraphy
	};
}

export default connect(mapStateToProps)(Moves);
