import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Background from '../common/Background';
import { getMaximumComments } from '../../../selectors/moves';
import { Metric } from './Metric';
import Text from '../common/Text';
import commonCss from '../common/css';
import finalCss from '../common/final.css';
import { animateH1, animateScore, animateMetrics } from './animate';
import css from './css';

export class Recap extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		animateH1(findDOMNode(this.refs.h1));
		animateScore(this.refs.score);
		animateMetrics(this.refs.metrics);
	}
	render() {
		const h1Class = classnames({
			[finalCss.h1]: true,
			[css.h1]: true
		});
		const scoreClass = classnames({
			[finalCss.score]: true,
			[css.score]: true
		});
		return (
			<div className={css.recap}>
				<Background animated />
				<Text ref="h1" className={h1Class}>
					PARTIE FINIE
				</Text>
				<div ref="score" className={scoreClass}>
					{this.props.performance.score} POINTS
				</div>
				<div ref="metrics" className={css.metrics}>
					<div className={css.excellent}>
						<Metric
							label="EXCELLENT"
							value={this.props.performance.comments.excellent}
							maxValue={this.props.maxComments}
						/>
					</div>
					<div className={css.good}>
						<Metric
							label="BIEN"
							value={this.props.performance.comments.good}
							maxValue={this.props.maxComments}
						/>
					</div>
					<div className={css.ok}>
						<Metric
							label="OK"
							value={this.props.performance.comments.ok}
							maxValue={this.props.maxComments}
						/>
					</div>
					<div className={css.combo}>
						<Metric
							label="COMBO"
							value={this.props.performance.comments.combo}
							maxValue={this.props.maxComments}
						/>
					</div>
				</div>
				<div className={css.hint}>
					<Text>APPUYEZ SUR</Text>
					<div className={commonCss.arrow_right}></div>
					<Text>POUR ENREGISTRER VOTRE SCORE</Text>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		performance: state.performance,
		maxComments: getMaximumComments(state)
	};
};

export default connect(mapStateToProps)(Recap);
