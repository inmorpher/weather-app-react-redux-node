import { PayloadAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { TimeService } from '../../utils/services/time/time.service';
import { RootState } from '../store';
import { LoadingStatus } from './weatherSlice';

export interface IWeatherList {
	city: string;
	country: string;
	temp?: string;
	weather?: string;
}

export type UserTheme = 'light' | 'dark';

export type UserUnits = 'metric' | 'imperial';

export type PopupState = {
	open: true | false;
	pY: number;
	pX: number;
};

export interface IUserData {
	userTheme: UserTheme;
	userCityList: IWeatherList[];
	userMetrics: UserUnits;
}

export interface IUserState {
	loading: LoadingStatus;
	popup: PopupState;
	data: IUserData;
	error: string;
}

const initialState: IUserState = {
	loading: false,
	popup: { open: false, pX: 0, pY: 0 },
	data: {} as IUserData,
	error: '',
};

const themeDefine = (): UserTheme => {
	const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
	let userTheme: UserTheme;
	if (isDarkTheme) {
		userTheme = 'dark';
		document.body.setAttribute('data-theme', userTheme);
		return userTheme;
	} else {
		userTheme = 'light';
		document.body.setAttribute('data-theme', userTheme);
		return userTheme;
	}
};

export const fetchUserList = createAsyncThunk('/user', async () => {
	try {
		const response = localStorage.getItem('userData');
		if (response) {
			const res = JSON.parse(response);
			document.body.setAttribute('data-theme', res.userTheme);
			return res;
		}
		const localState: IUserData = {
			userTheme: themeDefine(),
			userMetrics: 'metric',
			userCityList: [],
		};
		localStorage.setItem('userData', JSON.stringify(localState));
	} catch (e) {
		return e;
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		togglePopup: (state, action) => {
			const { posX, posY } = action.payload;
			state.popup.open = !state.popup.open;

			state.popup.pX = posX;
			state.popup.pY = posY;
		},
		toggleTheme: (state) => {
			if (state.data.userTheme === 'dark') {
				document.body.setAttribute('data-theme', 'light');
				state.data.userTheme = 'light';
			} else {
				document.body.setAttribute('data-theme', 'dark');
				state.data.userTheme = 'dark';
			}
			localStorage.setItem('userData', JSON.stringify(state.data));
		},
		toggleMetrics: (state) => {
			if (state.data.userMetrics === 'metric') {
				state.data.userMetrics = 'imperial';
			} else {
				state.data.userMetrics = 'metric';
			}
			localStorage.setItem('userData', JSON.stringify(state.data));
		},
		deleteCity: (state, action) => {
			const cityList = state.data.userCityList.filter((item) => {
				return action.payload.city !== item.city || action.payload.country !== item.country;
			});

			state.data.userCityList = cityList;
			localStorage.setItem('userData', JSON.stringify(state.data));
		},
		addCity: (state, action) => {
			const { city, country } = action.payload;
			const isExist = state.data.userCityList.find(
				(item) => item.city === city && item.country === country
			);
			if (!isExist) {
				state.data.userCityList.push({ city, country });
				localStorage.setItem('userData', JSON.stringify(state.data));
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserList.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchUserList.rejected, (state) => {
			state.error = 'error';
			state.loading = false;
		});
		builder.addCase(fetchUserList.fulfilled, (state, action: PayloadAction<IUserData>) => {
			state.data = action.payload;
			state.error = '';
			state.loading = false;
		});
	},
});

export const getUserCityList = (state: RootState) => {
	return state.user.data.userCityList;
};

export const getUserCityListMemo = createSelector(getUserCityList, (data) => data);

export const selectControls = createSelector(
	(state: RootState) => state.user.data.userTheme,
	(state: RootState) => state.user.data.userMetrics,
	(userTheme, userMetric) => {
		return {
			theme: userTheme,
			units: userMetric,
			timeLastUpdate: new TimeService().getTime('hoursAndMinutes').result(),
		};
	}
);

export const selectPopupState = createSelector(
	(state: RootState) => state.user.popup,
	(popup) => {
		return {
			state: popup.open,
			positionX: popup.pX,
			positionY: popup.pY,
		};
	}
);

export const { toggleTheme, toggleMetrics, togglePopup, deleteCity, addCity } = userSlice.actions;
export default userSlice.reducer;
