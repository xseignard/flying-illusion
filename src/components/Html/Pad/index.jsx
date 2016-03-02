import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';

export class Pad extends Component {
	shouldComponentUpdate(nextProps) {
		const tp = this.props.hits;
		const np = nextProps.hits;
		return (
			tp.top !== np.top ||
			tp.right !== np.right ||
			tp.bottom !== np.bottom ||
			tp.left !== np.left
		);
	}
	render() {
		const topOpacity = this.props.hits.top ? { opacity: 1 } : { opacity: 0 };
		const rightOpacity = this.props.hits.right ? { opacity: 1 } : { opacity: 0 };
		const bottomOpacity = this.props.hits.bottom ? { opacity: 1 } : { opacity: 0 };
		const leftOpacity = this.props.hits.left ? { opacity: 1 } : { opacity: 0 };
		return (
			<div className={css.pad} >
				<img src="img/pad.png" />
				<img style={topOpacity} src="img/pad_top.png" />
				<img style={rightOpacity} src="img/pad_right.png" />
				<img style={bottomOpacity} src="img/pad_bottom.png" />
				<img style={leftOpacity} src="img/pad_left.png" />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		hits: state.hits,
	};
};

export default connect(mapStateToProps)(Pad);
