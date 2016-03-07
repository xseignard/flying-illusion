import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Background from '../common/Background';
import Lightning from '../common/Lightning';
import { getMaximumComments, getMaximumProgression } from '../../../selectors/moves';
import { Metric } from '../common/Metric';
import Texte from '../common/Texte';
import commonCss from '../common/css';
import finalCss from '../common/final.css';
import metricsCss from '../common/metrics.css';
import css from './css';
import { animateH1, animateScore, animateMetrics } from './animate';

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
		const metricsClass = classnames({
			[metricsCss.metrics]: true,
			[metricsCss.fading]: true,
		});
		return (
			<div className={css.recap}>
				<Background animated="in" />
				<Texte ref="h1" className={h1Class}>
					PARTIE FINIE
				</Texte>
				<div ref="score" className={scoreClass}>
					{this.props.performance.score} POINTS
				</div>
				<div ref="metrics" className={metricsClass}>
					<div className={css.excellent}>
						<Metric
							animated
							label="EXCELLENT"
							value={this.props.performance.comments.excellent}
							maxValue={this.props.maxComments}
						/>
					</div>
					<div className={metricsCss.good}>
						<Metric
							animated
							label="BIEN"
							value={this.props.performance.comments.good}
							maxValue={this.props.maxComments}
						/>
					</div>
					<div className={metricsCss.ok}>
						<Metric
							animated
							label="OK"
							value={this.props.performance.comments.ok}
							maxValue={this.props.maxComments}
						/>
					</div>
					<div className={metricsCss.combo}>
						<Metric
							animated
							label="COMBO MAX"
							value={this.props.performance.comboMax}
							maxValue={this.props.maxCombo}
						/>
					</div>
				</div>
				<div className={commonCss.hint}>
					<Texte>APPUYEZ SUR</Texte>
					<div className={commonCss.arrow_right}></div>
					<Texte>POUR ENREGISTRER VOTRE SCORE</Texte>
				</div>
				<Lightning />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		performance: state.performance,
		maxComments: getMaximumComments(state),
		maxCombo: getMaximumProgression(state)
	};
};

export default connect(mapStateToProps)(Recap);
