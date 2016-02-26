import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toggleMuted } from '../../actions/admin';
import { clearRecords } from '../../actions/records';
import css from './css';

export class Admin extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const soundClass = classnames({
			[css.sound]: true,
			[css.muted]: this.props.admin.get('muted')
		});
		const soundText = this.props.admin.get('muted') ? 'Sound off' : 'Sound on';
		return (
			<div className={css.admin}>
				<h1 className={css.h1}>Admin</h1>
				<div className={css.clearRecords} onClick={this.props.clearRecords}>
					Clear records
				</div>
				<br />
				<br />
				<div className={soundClass} onClick={this.props.toggleMuted}>
					{soundText}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		admin: state.admin,
	};
}

export default connect(mapStateToProps, { toggleMuted, clearRecords })(Admin);
