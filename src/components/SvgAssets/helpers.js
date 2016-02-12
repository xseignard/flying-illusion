export const getSvg = (node) => {
	const serializer = new XMLSerializer();
	const svgStr = serializer.serializeToString(node.elem);
	return svgStr;
};
