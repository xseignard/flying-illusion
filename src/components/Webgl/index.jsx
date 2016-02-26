import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import C from '../../constants';
import * as gameActions from '../../actions/game';
import { getVisibleMoves } from '../../selectors/moves';
import { getPerformance } from '../../selectors/performance';
import {
	getTranslation,
	getSpriteOffset
} from './common/helpers';
import Scene from './Scene';

export class Webgl extends Component {
	constructor(props) {
		super(props);
		this._onAnimate = this._onAnimate.bind(this);
		this.sceneMoves = new Map();
		this.sceneTargets = {};
	}
	componentWillReceiveProps(nextProps) {
		Object.keys(this.props.snapshots).forEach(direction => {
			const currentSnapshot = this.props.snapshots[direction];
			const nextSnapshot = nextProps.snapshots[direction];
			if (
				(
					currentSnapshot.lastComment !== nextSnapshot.lastComment ||
					currentSnapshot.commentCount !== nextSnapshot.commentCount
				) &&
				nextSnapshot.lastComment.match(/ok|good|excellent/)
			) {
				this.sceneTargets[direction].shouldAnimate = true;
				this.sceneTargets[direction].tileIndex = 0;
				this.sceneTargets[direction].material.opacity = 1;
			}
		});
	}
	_onAnimate() {
		this.gameTime = Date.now() - this.props.choregraphy.get('time');
		this.sceneMoves.forEach(move => {
			move.ref.translateY(getTranslation(
				move.ref.position.y,
				move.showTime,
				this.gameTime,
			));
		});
		Object.keys(this.sceneTargets).forEach(direction => {
			if (this.sceneTargets[direction].shouldAnimate) {
				this.sceneTargets[direction].tileIndex++;
				if (
					this.sceneTargets[direction].tileIndex >= this.sceneTargets[direction].maxTiles
				) {
					this.sceneTargets[direction].shouldAnimate = false;
					this.sceneTargets[direction].tileIndex = 0;
					this.sceneTargets[direction].material.opacity = 0;
				}
				this.sceneTargets[direction].ref.offset = getSpriteOffset(
					this.sceneTargets[direction].tileIndex,
					this.sceneTargets[direction].hTiles,
					this.sceneTargets[direction].vTiles
				);
			}
		});
	}
	render() {
		return (
			<React3
				mainCamera="camera"
				width={C.APP_WIDTH}
				height={C.APP_HEIGHT}
				alpha
				clearAlpha={0}
				onAnimate={this._onAnimate}
				antialias
			>
				<Scene
					sceneMoves={this.sceneMoves}
					sceneTargets={this.sceneTargets}
					game={this.props.game}
					moves={this.props.moves}
				/>
			</React3>
		);
	}
}

function mapStateToProps(state) {
	return {
		game: state.game,
		choregraphy: state.choregraphy,
		moves: getVisibleMoves(state),
		snapshots: getPerformance(state).snapshots
	};
}

export default connect(mapStateToProps, gameActions)(Webgl);
