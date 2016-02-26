import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toggleMuted } from '../../actions/admin';
import { clearRecords } from '../../actions/records';
import css from './css';

export class Admin extends Component {
	constructor(props) {
		super(props);
		this.confirmClearRecords = this.confirmClearRecords.bind(this);
		this.exportToJSON = this.exportToJSON.bind(this);
	}
	confirmClearRecords() {
		if (window.confirm('Delete records?')) {
			this.props.clearRecords();
		}
	}
	exportToJSON() {
		const data = JSON.stringify(this.props.records);
		const myWindow = window.open(
			`data:text/html,${encodeURIComponent(data)}`,
			'_blank'
		);
		myWindow.focus();
	}
	render() {
		const soundClass = classnames({
			[css.sound]: true,
			[css.muted]: this.props.admin.get('muted')
		});
		const soundText = this.props.admin.get('muted') ? 'Unmute sound' : 'Mute sound';
		return (
			<div className={css.admin}>
				<h1 className={css.h1}>ADMIN</h1>
				<h2 className={css.h2}>SOUND</h2>
				<div className={soundClass} onClick={this.props.toggleMuted}>
					{soundText}
				</div>
				<h2 className={css.h2}>RANK</h2>
				<div className={css.button} onClick={this.confirmClearRecords}>
					Delete records
				</div>
				<div className={css.button} onClick={this.exportToJSON}>
					Export to JSON
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		admin: state.admin,
		records: state.records,
	};
}

export default connect(mapStateToProps, { toggleMuted, clearRecords })(Admin);
