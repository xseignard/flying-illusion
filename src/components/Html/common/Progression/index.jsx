import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { getMaximumProgression } from '../../../../selectors/moves';
import css from './css';

const getTranslateX = (progression, max) => {
	return `translateX(${-100 * (Math.min(1 - progression / max, 0.99))}%)`;
};

export class Performance extends Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps) {
		return this.props.progression !== nextProps.progression;
	}
	componentDidUpdate(prevProps) {
		this.animation = this.refs.progressionBar.animate([
			{ transform: getTranslateX(prevProps.progression, this.props.max) },
			{ transform: getTranslateX(this.props.progression, this.props.max) }
		], {
			duration: 200,
			easing: 'cubic-bezier(0,0,0.32,1)'
		});
	}
	render() {
		const progressionClass = classnames({
			[css.progression]: true,
			[css.notNull]: this.props.progression > 0,
		});
		const inlineStyle = { transform: getTranslateX(this.props.progression, this.props.max) };
		return (
			<div className={progressionClass}>
				<div className={css.line}></div>
				<div
					ref="progressionBar"
					style={inlineStyle}
					className={css.progressionBar}
				></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		progression: state.performance.progression,
		max: getMaximumProgression(state),
	};
};

export default connect(mapStateToProps)(Performance);
