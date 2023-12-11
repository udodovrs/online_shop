import { ACTION_TYPE } from '../constants/action-type';
import { ROLE } from '../constants/role';

const userPersisitState = JSON.parse(sessionStorage.getItem('gradProject'));

const guestUserState = {	
	id: null,
	login: null,
	role: ROLE.GUEST,
	cart:[],
	registredAt: null,
};

const initialUserState = userPersisitState ? userPersisitState : guestUserState;

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return guestUserState;
		default:
			return state;
	}
};
