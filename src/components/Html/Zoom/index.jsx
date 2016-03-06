import React from 'react';
import classnames from 'classnames';
import Headline from '../common/Headline';
import commonCss from '../common/css';
import css from './css';

export default () => {
	const thisClass = classnames({
		[commonCss.logo]: true,
		[commonCss.out]: true
	});
	return (
		<div className={css.zoom}>
			<div className={thisClass}>
				<img src="img/logo.png" />
			</div>
			<div className={commonCss.headline}>
				<Headline direction="out" lineNumber="line1">
					Prenez vos marques sur le tapis
				</Headline>
				<Headline direction="out" lineNumber="line2">
					Pour entrer dans la danse
				</Headline>
			</div>
		</div>
	);
};
