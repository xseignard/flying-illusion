import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listenToPads } from '../../actions/pads';
import Video from '../Video';
import Three from '../Three';
import Html from '../Html';
import css from './css';

export class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.listenToPads();
	}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<div className={css.app}>
				<div className={css.video}>
					<Video />
				</div>
				<div className={css.three}>
					<Three />
				</div>
				<div className={css.html}>
					<Html />
				</div>
			</div>
		);
	}
}

export default connect(state => state, { listenToPads })(App);
