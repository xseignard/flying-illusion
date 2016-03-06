import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import classnames from 'classnames';
import C from '../../constants';
import * as gameActions from '../../actions/game';
import Scene from './Scene';
import Lines from '../Html/common/Lines';
import Game from '../Html/common/Game';
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
		}, C.ASSETS_WEBGL_RENDER_TIME);
	}
	render() {
		const status = this.props.game.get('status');
		const topClass = classnames({
			[css.webgl]: true,
			[css[status]]: true
		});
		const linesClass = classnames({
			[css.lines]: true,
			[css.hidden]: status.match(/load|end/)
		});
		const gameClass = classnames({
			[css.game]: true,
			[css.hidden]: status.match(/load|end/)
		});
		return (
			<div className={topClass}>
				<div className={linesClass}>
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
				<div className={gameClass}>
					<Game />
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
