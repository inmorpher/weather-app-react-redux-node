import classNames from 'classnames';
import { useAppSelector } from '../../../../store/hooks.type';
import { selectPopupMainWeather } from '../../../../store/slices/weatherSlice';
import globalStyles from '../../../../utils.module.scss';
import styles from './PopupMainWeather.module.scss';

type Props = {
	day: number;
};

function WeatherCondition({ day }: Props) {
	const { max, min, icon, condition } = useAppSelector(selectPopupMainWeather(day));
	return (
		<div
			className={classNames(
				styles.popup_weather__current,
				globalStyles.flex,
				globalStyles.flex__between
			)}
		>
			<div className={classNames(globalStyles.flex, globalStyles.flex__align__center)}>
				<img className={styles.popup_weather__icon} src={`/icons/static/conditions/${icon}.svg`} />
				<span className={styles.popup_weather__condition}>{condition}</span>
			</div>
			<div
				className={classNames(
					styles.popup_weather__current__temp__minmax,
					globalStyles.flex__align__bottom
				)}
			>
				<span>
					{max.value}
					{max.units}
				</span>
				<span>
					{min.value}
					{min.units}
				</span>
			</div>
		</div>
	);
}

export default WeatherCondition;
