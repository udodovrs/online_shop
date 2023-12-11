import { store } from '../store';

export const setUserSessionStorage = () => {
	const user = JSON.stringify(store.getState().user);
	sessionStorage.setItem('gradProject', user);
};

export const removeUserSessionStorage = () => sessionStorage.removeItem('gradProject');
