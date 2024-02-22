const initialState = {
	open: false,
	pX: 0,
	pY: 0,
};

export type ActionType =
	| { type: 'OPEN'; pX: number; pY: number }
	| { type: 'CLOSE' }
	| { type: 'UPDATE_POSITION'; pX: number; pY: number };

const popupReducer = (state: typeof initialState, action: ActionType) => {
	switch (action.type) {
		case 'OPEN':
			return {
				open: true,
				pX: action.pX,
				pY: action.pY,
			};
		case 'CLOSE':
			return {
				...state,
				open: false,
			};
		case 'UPDATE_POSITION':
			return {
				...state,
				pX: action.pX,
				pY: action.pY,
			};
		default:
			return state;
	}
};

export { popupReducer, initialState };
