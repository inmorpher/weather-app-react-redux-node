import classNames from 'classnames';
import { startTransition, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks.type';
import { fetchWeather } from '../../store/slices/weatherSlice';
import globalStyles from '../../utils.module.scss';
import Search from './Search/Search';
import WeatherCards from './WeatherCards/WeatherCards';

const WeatherDetails = () => {
	const { city, country } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (city && country) {
			startTransition(() => {
				dispatch(fetchWeather());
			});
		}
	}, [city, dispatch, country]);

	return (
		<>
			<main
				className={classNames(globalStyles.flex, globalStyles.flex__column, globalStyles.layout)}
			>
				<Search />
				<WeatherCards />
			</main>
		</>
	);
};

export default WeatherDetails;
