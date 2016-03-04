import React from 'react';
import Headline from '../common/Headline';
import commonCss from '../common/css';
import css from './css';

export default () => {
	return (
		<div className={css.assets}>
			<div className={commonCss.headline}>
				<Headline direction="in" lineNumber="line1">
					Chargement en cours...
				</Headline>
				<Headline direction="in" lineNumber="line2">
					Veuillez patienter (60 secondes)
				</Headline>
			</div>
		</div>
	);
};
