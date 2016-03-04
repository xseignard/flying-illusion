import React from 'react';
import C from '../../../constants';
import Headline from '../common/Headline';
import commonCss from '../common/css';
import css from './css';

export default () => {
	return (
		<div className={css.assets}>
			<video
				className={css.video}
				src="videos/idle_zoom.mp4"
				width={C.APP_WIDTH}
				height={C.APP_HEIGHT}
				loop
				muted
				autoPlay
			></video>
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
