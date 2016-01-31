import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { should } from 'chai';
import { DumbApp } from '../index';

should();

describe('DumbApp', () => {
	it('should render ok', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<DumbApp />);
		const result = renderer.getRenderOutput();
		// root object of component should be a div
		result.type.should.equal('div');
	});
});
