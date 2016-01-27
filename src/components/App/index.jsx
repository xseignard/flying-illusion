import React from 'react';
import { connect } from 'react-redux';
import css from './css';

// exported so we can write tests
// see: https://github.com/rackt/redux/blob/master/docs/recipes/WritingTests.md#connected-components
export class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={css.app}>
				<h1>Hello World</h1>
			</div>
		);
	}
}

export default connect(state => state)(App);
