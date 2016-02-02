import C from '../constants';

export function arrows(state = [], action) {
	switch (action.type) {
		case C.ARROW_ADD:
			const arrowsCopy = [].concat(state);
			arrowsCopy.push({
				id: action.id,
				direction: action.direction,
				duration: action.duration,
				status: 'shown'
			});
			return arrowsCopy;
		case C.ARROW_REMOVE:
			return state.filter((arrow) => {
				return (arrow.id !== action.id);
			});
		case C.ARROW_STATUS:
			return state.map((arrow) => {
				if (arrow.id === action.id) {
					return Object.assign({}, arrow, {
						status: action.status
					});
				}
				return arrow;
			});
		default:
			return state;
	}
}
