import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Background from '../common/Background';
import { Metric } from '../common/Metric';
import Lightning from '../common/Lightning';
import { saveRecord } from '../../../actions/records';
import { launchRank } from '../../../actions/game';
import Letter from './Letter';
import Shooter from './Shooter';
import Texte from '../common/Texte';
import commonCss from '../common/css';
import finalCss from '../common/final';
import metricsCss from '../common/metrics.css';
import css from './css';

export class Save extends Component {
	constructor(props) {
		super(props);
		this.state = { focusIndex: 0 };
		this.letters = ['A', 'A', 'A'];
		this.onLetter = this.onLetter.bind(this);
		this.onLeft = this.onLeft.bind(this);
		this.onRight = this.onRight.bind(this);
	}
	onLetter(index, letter) {
		this.letters[index] = letter;
	}
	onLeft(index, letter) {
		this.setState({ focusIndex: this.state.focusIndex - 1 });
	}
	onRight(index, letter) {
		if (index < this.letters.length - 1) {
			this.setState({ focusIndex: this.state.focusIndex + 1 });
		}
		else {
			this.props.saveRecord({
				time: this.props.choregraphy.get('time'),
				name: this.props.choregraphy.get('name'),
				player: this.letters.join(''),
				score: this.props.performance.score,
				comments: this.props.performance.comments
			});
			this.refs.letters.classList.add(css.fadeout);
			setTimeout(this.props.launchRank, 300);
		}
	}
	render() {
		const controls = [
			['top', 'bottom', 'right'],
			['left', 'top', 'bottom', 'right'],
			['left', 'top', 'bottom', 'right'],
		];
		const lettersContent = this.letters.map((letter, index) => {
			return (
				<Letter
					key={index}
					index={index}
					focus={this.state.focusIndex === index}
					letter={letter}
					height={150}
					duration={200}
					controls={controls[index]}
					onLetter={this.onLetter}
					onLeft={this.onLeft}
					onRight={this.onRight}
				/>
			);
		});
		const metricsClass = classnames({
			[metricsCss.metrics]: true,
			[metricsCss.fadeout]: true,
		});
		return (
			<div className={css.save}>
				<Background />
				<Texte className={finalCss.h1}>
					PARTIE FINIE
				</Texte>
				<div className={finalCss.score}>
					{this.props.performance.score} POINTS
				</div>
				<div className={commonCss.hint}>
					<Texte>
						INSCRIVEZ VOTRE PSEUDO EN FACE DE VOTRE SCORE
					</Texte>
				</div>
				<div ref="metrics" className={metricsClass}>
					<div className={metricsCss.excellent}>
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
				<div ref="letters" className={css.letters}>
					{lettersContent}
					<Shooter controls={controls} focusIndex={this.state.focusIndex} />
				</div>
				<Lightning />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		choregraphy: state.choregraphy,
		performance: state.performance,
	};
};

export default connect(mapStateToProps, { saveRecord, launchRank })(Save);
