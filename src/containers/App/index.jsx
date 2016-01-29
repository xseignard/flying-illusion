import React from 'react';
import { connect } from 'react-redux';
import css from './css';
import { listenToKeyDown } from '../../actions/input';

// exported so we can write tests
// see: https://github.com/rackt/redux/blob/master/docs/recipes/WritingTests.md#connected-components
export class App extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.listenToKeyDown();
	}
	render() {
		return (
			<div className={css.app}>
				<h1>Marchez sur le tapis pour rejoindre le battle</h1>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listenToKeyDown() { dispatch(listenToKeyDown()); }
	};
};

export default connect(state => state, mapDispatchToProps)(App);
