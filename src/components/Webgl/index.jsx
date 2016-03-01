import React, { Component } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import C from '../../constants';
import * as gameActions from '../../actions/game';
import Scene from './Scene';

export class Webgl extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<React3
				mainCamera="camera"
				width={C.APP_WIDTH}
				height={C.APP_HEIGHT}
				alpha
				clearAlpha={0}
				antialias
			>
				<Scene
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
