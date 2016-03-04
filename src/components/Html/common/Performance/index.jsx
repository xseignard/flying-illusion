import React, { Component } from 'react';
import { connect } from 'react-redux';
import Text from '../Text';
import css from './css';

const comments = {
	ok: 'OK',
	good: 'BIEN',
	excellent: 'EXCELLENT',
	fail: '',
	miss: '',
};

export class Performance extends Component {
	constructor() {
		super();
		this.addLastCommentClass = this.addLastCommentClass.bind(this);
	}
	componentDidUpdate(prevProps) {
		this.refs.lastComment.classList.remove(css.lastCommentUpdate);
		requestAnimationFrame(this.addLastCommentClass);
	}
	addLastCommentClass() {
		if (this.refs.lastComment) {
			this.refs.lastComment.classList.add(css.lastCommentUpdate);
		}
	}
	render() {
		return (
			<div className={css.performance}>
				<div className={css.score}>
					<div className={css.label}>SCORE</div>
					<div className={css.amount}>
						<Text>{this.props.performance.score}</Text>
					</div>
				</div>
				<div className={css.combo}>
					<div className={css.label}>
						<div ref="lastComment">
							{comments[this.props.performance.comments.last]}
						</div>
					</div>
					<div className={css.amount}>
						<Text>X{this.props.performance.combo}</Text>
					</div>
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
