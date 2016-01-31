import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { should } from 'chai';
import { Header } from '../index';

should();

describe('Header', () => {
	it('should render ok', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<Header />);
		const result = renderer.getRenderOutput();
		// root object of component should be a div
		result.type.should.equal('div');
	});
});
