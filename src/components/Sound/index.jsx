import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';

export class Sound extends Component {
	constructor(props) {
		super(props);
		this.getSoundSrc = this.getSoundSrc.bind(this);
	}
	getSoundSrc() {
	}
	render() {
		const soundSrc = this.getSoundSrc();
		return (
			<div className={css.sound}>
				<audio
					ref="sound"
					src={soundSrc}
					autoPlay
					muted={this.props.admin.get('muted')}
				>
				</audio>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		admin: state.admin,
		sound: state.sound,
	};
};

export default connect(mapStateToProps)(Sound);
