import React from 'react';
import classnames from 'classnames';
import Headline from '../common/Headline';
import Background from '../common/Background';
import css from './css';
import commonCss from '../common/css';

export default () => {
	const leftArrowClass = classnames({
		[commonCss.arrow_left]: true,
		[css.arrow_left]: true,
	});
	const rightArrowClass = classnames({
		[commonCss.arrow_right]: true,
		[css.arrow_right]: true,
	});
	return (
		<div className={css.wait}>
			<Background />
			<div className={commonCss.headline}>
				<Headline direction="in" delay="200" lineNumber="line1">
					Maintenez
					<div className={leftArrowClass}></div>
					et
					<div className={rightArrowClass}></div>
					avec vos pieds
				</Headline>
				<Headline direction="in" delay="200" lineNumber="line2">
					pendant 5 secondes
				</Headline>
			</div>
		</div>
	);
};
