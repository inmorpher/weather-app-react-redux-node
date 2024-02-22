import { useAppSelector } from '../../../store/hooks.type';
import { selectMainWeatherDescription } from '../../../store/slices/weatherSlice';
import styles from './MainWeatherDescription.module.scss';

const MainWeatherDescription = () => {
	const { temp, condition, clouds, max, min } = useAppSelector(selectMainWeatherDescription);

	return (
		<div className={styles.weather__desc}>
			<p className={styles.weather__desc__temp}>
				{temp.value}
				{temp.units}
			</p>
			<p className={styles.weather__desc__cond}>{condition}</p>
			<p className={styles.minmax}>
				max: {max.value}
				{max.units}, min: {min.value}
				{min.units}
			</p>
			<p className={styles.weather__desc__clouds}>clouds: {clouds}%</p>
		</div>
	);
};

export default MainWeatherDescription;
