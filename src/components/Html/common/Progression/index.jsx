import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { getMaximumProgression } from '../../../../selectors/moves';
import css from './css';

const getScale = (progression, max) => {
	return `scaleX(${progression / max})`;
};

export class Performance extends Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps) {
		return this.props.progression !== nextProps.progression;
	}
	componentDidUpdate(prevProps) {
		this.animation = this.refs.progressionContent.animate([
			{ transform: getScale(prevProps.progression, this.props.max) },
			{ transform: getScale(this.props.progression, this.props.max) }
		], {
			duration: 200,
			easing: 'cubic-bezier(0,0,0.32,1)'
		});
	}
	render() {
		const progressionClass = classnames({
			[css.progressionBar]: true,
			[css.notNull]: this.props.progression > 0,
		});
		const inlineStyle = { transform: getScale(this.props.progression, this.props.max) };
		return (
			<div className={css.progression}>
				<div className={progressionClass}>
					<div
						ref="progressionContent"
						style={inlineStyle}
						className={css.progressionContent}
					></div>
				</div>
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
