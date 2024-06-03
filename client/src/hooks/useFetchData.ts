import { useEffect } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks.type';
import { useGetWeatherQuery } from '../store/slices/weatherApiSlice';
import { RootState } from '../store/store';

/**
 * Custom hook for fetching weather data based on URL parameters or search parameters.
 * It navigates to the home page if no valid parameters are found.
 * It also handles the case when there is an error in fetching weather data.
 */
export const useFetchData = () => {
	// Retrieve URL parameters and search parameters.
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const location = useLocation();

	// Combine URL parameters into a single string.
	const urlParams = Object.values(params).join(',');
	// Extract latitude and longitude from search parameters.
	const [lat, lon] = searchParams.get('coord')?.split(',') || [];

	// Access the error state from the weather slice of the Redux store.
	// const error = useAppSelector((state) => state.weather.error);

	const error = useAppSelector((state: RootState) => state.weather.error);

	const { isError, isLoading, isSuccess } = useGetWeatherQuery(urlParams);

	// Log any existing error to the console.

	// Effect hook to fetch weather data or navigate home based on parameters.
	useEffect(() => {
		// Navigate to home if no valid parameters are found.
		if ((!urlParams || !urlParams.trim()) && (!lat || !lat.trim()) && (!lon || !lon.trim())) {
			navigate('/');
			return;
		}
		// Log and return if there is an error.
		if (error) {
			console.log('that an error happened');
			return;
		}

		// Dispatch fetchWeather action with URL parameters or latitude and longitude.
		if (urlParams) {
			console.log(urlParams, 'urlParams');
			// useGetWeatherByNameQuery(urlParams)
			// dispatch(fetchWeather(urlParams));
		} else if (lat && lon) {
			console.log(urlParams, 'urlParams 2');

			// dispatch(fetchWeather({ latitude: Number(lat), longitude: Number(lon) }));
		}
	}, [dispatch, error, lat, lon, navigate, urlParams]);
};
