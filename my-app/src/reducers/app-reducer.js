import { ACTION_TYPE } from '../constants/action-type';

const initialAppState = {	
	lastPage: null,
    editProduct: false,
};



export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.IS_MODAL:
			return {
				...state,
				isModal: action.payload,
			};
		case ACTION_TYPE.EDIT_PRODUCT:
			return {
				...state,
				editProduct: action.payload,
			};	
		case ACTION_TYPE.SET_COUNT_PAGE:
			return {
				...state,
				lastPage: action.payload,
			};	
		default:
			return state;
	}
};
