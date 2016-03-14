import React from 'react';
import Headline from '../common/Headline';
import commonCss from '../common/css';
import css from './css';

export default () => {
	return (
		<div className={css.zoom}>
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
