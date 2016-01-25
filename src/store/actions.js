// action types
export const TEST = 'TEST';

// action creators
export function handleTest(test) {
	return { type: TEST, test };
}
