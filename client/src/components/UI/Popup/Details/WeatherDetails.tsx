import classNames from 'classnames';
import { useAppSelector } from '../../../../store/hooks.type';
import { selectPopupDailyDetails } from '../../../../store/slices/weatherSlice';
import styles from './WeatherDetails.module.scss';
type PopupWeatherDetailsProps = {
	day: number;
};

const WeatherDetails = ({ day }: PopupWeatherDetailsProps) => {
	const { uvi, humidity, pressure, precipitation, clouds, summary, wind } = useAppSelector(
		selectPopupDailyDetails(day)
	);

	return (
		<div className={styles.popup__weather__details}>
			<div>
				uvi: <div className={styles.popup__weather__details__description}>{Math.round(uvi)}</div>
			</div>
			<div>
				humidity: <div className={styles.popup__weather__details__description}>{humidity}%</div>
			</div>
			<div>
				pressure: <div className={styles.popup__weather__details__description}>{pressure}hpa</div>
			</div>
			<div>
				clouds: <div className={styles.popup__weather__details__description}>{clouds}%</div>
			</div>
			<div className={classNames(styles.item, styles.double)}>
				Wind:
				<div className={styles.popup__weather__details__description}>
					{wind.speed.value + wind.speed.units} <span>{wind.direction}</span>
				</div>
				<div className={styles.popup__weather__details__description}>
					{wind.gust && `Gust: ${wind.gust.value + wind.gust.units}`}
				</div>
			</div>
			<div className={classNames(styles.item, styles.double)}>
				Precipitation:
				<div className={styles.popup__weather__details__description}>
					<div>Possibility: {precipitation.pop}%</div>
					{precipitation.rain && <div>Rain: {precipitation.rain}mm/h</div>}
					{precipitation.snow && <div>Snow: {precipitation.snow}mm/h</div>}
				</div>
			</div>

			<div className={classNames(styles.item, styles.double, styles.text_center)}>{summary}</div>
		</div>
	);
};

export default WeatherDetails;
