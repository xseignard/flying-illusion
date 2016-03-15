import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';
import pad from '../../../../../www/img/pad.png';
import padTop from '../../../../../www/img/pad_top.png';
import padRight from '../../../../../www/img/pad_right.png';
import padBottom from '../../../../../www/img/pad_bottom.png';
import padLeft from '../../../../../www/img/pad_left.png';

export class Hits extends Component {
	shouldComponentUpdate(nextProps) {
		const tp = this.props.hits;
		const np = nextProps.hits;
		return (
			tp.top !== np.top ||
			tp.right !== np.right ||
			tp.bottom !== np.bottom ||
			tp.left !== np.left ||
			tp.showHits
		);
	}
	render() {
		let hitsContent = null;
		if (this.props.hits.showHits) {
			const topOpacity = this.props.hits.top ? { opacity: 1 } : { opacity: 0 };
			const rightOpacity = this.props.hits.right ? { opacity: 1 } : { opacity: 0 };
			const bottomOpacity = this.props.hits.bottom ? { opacity: 1 } : { opacity: 0 };
			const leftOpacity = this.props.hits.left ? { opacity: 1 } : { opacity: 0 };
			hitsContent = (
				<div className={css.hits} >
					<img style={{ opacity: 0.2 }} src={pad} />
					<img style={topOpacity} src={padTop} />
					<img style={rightOpacity} src={padRight} />
					<img style={bottomOpacity} src={padBottom} />
					<img style={leftOpacity} src={padLeft} />
				</div>
			);
		}
		return (
			<div>
				{hitsContent}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		hits: state.hits,
	};
};

export default connect(mapStateToProps)(Hits);
