import React from 'react';
import Headline from '../common/Headline';
import commonCss from '../common/css';
import css from './css';

export default () => {
	return (
		<div className={css.idle}>
			<div className={commonCss.logo}>
				<img src="img/logo.png" />
			</div>
			<div className={commonCss.headline}>
				<Headline
					direction="in"
					lineNumber="line1"
					delay={400}
				>
					Prenez vos marques sur le tapis
				</Headline>
				<Headline
					direction="in"
					lineNumber="line2"
					delay={400}
				>
					Pour entrer dans la danse
				</Headline>
			</div>
		</div>
	);
};
