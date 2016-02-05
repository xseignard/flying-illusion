import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { should } from 'chai';
import { ChoregraphyStep } from '../index';

should();

describe('ChoregraphyStep', () => {
	it('should render ok', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<ChoregraphyStep />);
		const result = renderer.getRenderOutput();
		// root object of component should be a div
		result.type.should.equal('div');
	});
});
