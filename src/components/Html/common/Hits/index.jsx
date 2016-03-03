import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';

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
					<img style={{ opacity: 0.2 }} src="img/pad.png" />
					<img style={topOpacity} src="img/pad_top.png" />
					<img style={rightOpacity} src="img/pad_right.png" />
					<img style={bottomOpacity} src="img/pad_bottom.png" />
					<img style={leftOpacity} src="img/pad_left.png" />
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
