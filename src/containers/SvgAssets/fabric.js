export const getSvg = (node) => {
	const serializer = new XMLSerializer();
	const svgStr = serializer.serializeToString(node.elem);
	return new Promise((resolve, reject) => {
		fabric.loadSVGFromString(svgStr, (objects, options) => {
			const fabricEl = fabric.util.groupSVGElements(objects, options);
			resolve([node.name, fabricEl]);
		});
	});
};
