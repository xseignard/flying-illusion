import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import classnames from 'classnames';
import C from '../../constants';
import * as gameActions from '../../actions/game';
import Scene from './Scene';
import Lines from '../Html/common/Lines';
import css from './css';

export class Webgl extends Component {
	constructor(props) {
		super(props);
		this.onRendererUpdated = this.onRendererUpdated.bind(this);
	}
	onManualRenderTriggerCreated(trigger) {
		trigger();
	}
	onRendererUpdated(renderer) {
		this.props.threeRefs.renderer = renderer;
		setTimeout(() => {
			renderer.render(this.props.threeRefs.scene, this.props.threeRefs.camera);
		}, 10000);
	}
	render() {
		const thisClass = classnames({
			[css.webgl]: true,
			[css[this.props.game.get('status')]]: true
		});
		return (
			<div className={thisClass}>
				<div className={css.lines}>
					<Lines />
				</div>
				<div className={css.react3}>
					<React3
						context="3d"
						mainCamera="camera"
						width={C.APP_WIDTH}
						height={C.APP_HEIGHT}
						alpha
						clearAlpha={0}
						antialias
						onRendererUpdated={this.onRendererUpdated}
						forceManualRender
						onManualRenderTriggerCreated={this.onManualRenderTriggerCreated}
					>
						<Scene
							threeRefs={this.props.threeRefs}
							movesRefs={this.props.movesRefs}
							targetsRefs={this.props.targetsRefs}
							game={this.props.game}
							moves={this.props.moves}
						/>
					</React3>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		game: state.game,
		moves: state.dance.get('moves'),
	};
};

export default connect(mapStateToProps, gameActions)(Webgl);
