import React, { Component } from 'react';
import { connect } from 'react-redux';
import Recap from './Recap';
import Save from './Save';
import Rank from './Rank';
import css from './css';

const animationPromise = (animation) => {
	return new Promise((resolve, reject) => {
		animation().onfinish = resolve;
	});
};

export class Final extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.animateBackground()
			.then(this.animateRecap.bind(this));
	}
	animateBackground() {
		return animationPromise(() => {
			return this.refs.background.animate([
				{ transform: 'scaleY(0)' },
				{ transform: 'scaleY(1)' }
			], {
				delay: 400,
				duration: 600,
				easing: 'cubic-bezier(0,0,0.32,1)'
			});
		});
	}
	animateRecap() {
		return animationPromise(() => {
			return this.refs.background.animate([
				{ transform: 'scaleY(1)' },
				{ transform: 'scaleY(0)' },
			], {
				duration: 400,
				easing: 'cubic-bezier(0,0,0.32,1)'
			});
		});
	}
	render() {
		const recapContent = this.props.game.get('status') !== 'recap' ? null : <Recap />;
		const saveContent = this.props.game.get('status') !== 'save' ? null : <Save />;
		const rankContent = this.props.game.get('status') !== 'rank' ? null : <Rank />;
		return (
			<div className={css.final}>
				<div ref="background" className={css.background}></div>
				{recapContent}
				{saveContent}
				{rankContent}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		game: state.game,
	};
};

export default connect(mapStateToProps)(Final);
