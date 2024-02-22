import { useAppSelector } from '../../../store/hooks.type';
import { selectLoadingStatus } from '../../../store/slices/weatherSlice';
import Loader from '../../UI/Loader/Loader';
import MainWeatherDescription from '../MainWeatherDescription/MainWeatherDescription';
import MainWeatherIcon from '../MainWeatherIcon/MainWeatherIcon';
import styles from './MainWeather.module.scss';
const MainWeather = () => {
	const isLoaded = useAppSelector(selectLoadingStatus);
	return (
		<div className={styles.main__weather}>
			{isLoaded ? (
				<>
					<MainWeatherDescription />
					<MainWeatherIcon />
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default MainWeather;
