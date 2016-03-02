import React from 'react';
import css from './css';

export default () => {
	return (
		<div>
			<div className={css.left} />
			<div className={css.top} />
			<div className={css.bottom} />
			<div className={css.right} />
		</div>
	);
};
