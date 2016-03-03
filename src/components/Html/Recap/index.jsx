import React, { Component } from 'react';
import { connect } from 'react-redux';
import Background from '../common/Background';
import { getMaximumComments } from '../../../selectors/moves';
import { Metric } from './Metric';
import Text from '../common/Text';
import commonCss from '../common/css';
import finalCss from '../common/final.css';
import css from './css';

export class Recap extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={css.recap}>
				<Background />
				<Text className={finalCss.h1}>
					PARTIE FINIE
				</Text>
				<div className={finalCss.score}>
					{this.props.performance.score} POINTS
				</div>
				<div className={css.metrics}>
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
