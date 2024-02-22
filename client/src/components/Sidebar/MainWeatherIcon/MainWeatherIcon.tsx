import React, { Suspense } from 'react';
import { useAppSelector } from '../../../store/hooks.type';
import { selectWeatherIconId } from '../../../store/slices/weatherSlice';
import styles from './MainWeatherIcon.module.scss';

const SnowDynamicIcon = React.lazy(() => import('../../Icons/SnowDynamicIcon'));
const ClearCloudyDynamicIcon = React.lazy(() => import('../../Icons/ClearCloudyDynamicIcon'));
const CloudsDynamicIcon = React.lazy(() => import('../../Icons/CloudsDynamicIcon'));
const PrecipitationDynamicIcon = React.lazy(() => import('../../Icons/PrecipitationDynamicIcon'));
const MistDynamicIcon = React.lazy(() => import('../../Icons/MistDynamicIcon'));

const MainWeatherIcon = () => {
	const { iconCode, timeOfDay } = useAppSelector(selectWeatherIconId);

	let WeatherIconElement = null;

	if (iconCode === '01' || iconCode === '02') {
		WeatherIconElement = <ClearCloudyDynamicIcon iconCode={iconCode} timeOfDay={timeOfDay} />;
	} else if (iconCode === '03' || iconCode === '04') {
		WeatherIconElement = <CloudsDynamicIcon iconCode={iconCode} />;
	} else if (iconCode === '09' || iconCode === '10' || iconCode === '11') {
		WeatherIconElement = <PrecipitationDynamicIcon iconCode={iconCode} />;
	} else if (iconCode === '13') {
		WeatherIconElement = <SnowDynamicIcon />;
	} else if (iconCode === '50') {
		WeatherIconElement = <MistDynamicIcon />;
	} else {
		WeatherIconElement = 'N/A';
	}

	return (
		<div className={styles.weather__icon}>
			<Suspense fallback={'loading'}>{WeatherIconElement}</Suspense>
		</div>
	);
};

export default MainWeatherIcon;
