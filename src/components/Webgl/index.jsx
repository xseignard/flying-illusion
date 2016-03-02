import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import C from '../../constants';
import * as gameActions from '../../actions/game';
import Scene from './Scene';

export class Webgl extends Component {
	constructor(props) {
		super(props);
		this.onRendererUpdated = this.onRendererUpdated.bind(this);
	}
	componentDidMount() {
		this.initialized = true;
	}
	onManualRenderTriggerCreated(trigger) {
		trigger();
	}
	onRendererUpdated(renderer) {
		this.props.threeRefs.renderer = renderer;
	}
	render() {
		return (
			<React3
				ref="boom"
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
