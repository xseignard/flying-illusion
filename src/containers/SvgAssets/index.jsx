import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Isvg from 'react-inlinesvg';

export default class SvgAssets extends Component {
	constructor(props) {
		super(props);
		this.augmentedAssets = this.props.assets.map((asset) => {
			let resolve;
			let reject;
			const promise = new Promise((pResolve, pReject) => {
				resolve = () => {
					pResolve({
						name: asset.name,
						elem: findDOMNode(this.refs[asset.name])
					});
				};
				reject = pReject;
			});
			return { asset, promise, resolve, reject };
		});
		const promises = this.augmentedAssets.map((augmentedAsset) => {
			return augmentedAsset.promise;
		});
		Promise.all(promises).then(this.props.onLoad);
	}
	render() {
		return (
			<div style={{ display: 'none' }}>
				{this.augmentedAssets.map((augmentedAsset, index) => {
					return (
						<Isvg
							key={index}
							ref={augmentedAsset.asset.name}
							src={augmentedAsset.asset.src}
							onLoad={augmentedAsset.resolve}
						/>
					);
				})}
			</div>
		);
	}
}
