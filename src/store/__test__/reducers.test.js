import { should } from 'chai';
import { createStore } from 'redux';
import reducers from '../reducers';
import { handleTest } from '../actions';

should();

describe('reducers', () => {
	describe('test', () => {
		let store;
		beforeEach(() => {
			store = createStore(reducers);
		});

		it('should return the initial state, i.e. true', () => {
			store.getState().test.should.equal(true);
		});

		it('should return the correct lang', () => {
			store.dispatch(handleTest(false));
			store.getState().test.should.equal(false);
		});
	});
});
