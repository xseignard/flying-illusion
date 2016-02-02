import C from '../constants';

export function choregraphy(state = [], action) {
	switch (action.type) {
		case C.CHOREGRAPHY:
			return [].concat(action.moves);
		case C.CHOREGRAPHY_RESET:
			return [];
		default:
			return state;
	}
}
