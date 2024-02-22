import { combineReducers, configureStore } from '@reduxjs/toolkit';

import weatherReducer from './slices/weatherSlice';
import userReducer from './slices/userSlice';
export const RootReducer = combineReducers({
	weather: weatherReducer,
	user: userReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: RootReducer,
	});
};

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
