import { Suspense, lazy } from 'react';
import { useAppSelector } from '../../../store/hooks.type';
import { selectLoadingStatus } from '../../../store/slices/weatherSlice';
import Card from '../../UI/Card/Card';
import cardStyles from '../../UI/Card/Card.module.scss';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import Aqi from '../Aqi/Aqi';
import Daily from '../Daily/Daily';
import Feeling from '../Feeling/Feeling';
import Humidity from '../Humidity/Humidity';
import Moon from '../Moon/Moon';
import Pressure from '../Pressure/Pressure';
import Sun from '../Sun/Sun';
import UV from '../UV/UV';
import Visibility from '../Visibility/Visibility';
import styles from '../WeatherDetails.module.scss';
import Wind from '../Wind/Wind';
const AsyncHourly = lazy(() => import('../Hourly/Hourly'));
const AsyncPrecipitation = lazy(() => import('../Precipitation/Precipitation'));

const WeatherCards = () => {
	const isLoaded = useAppSelector(selectLoadingStatus);

	return (
		<section className={styles.weather__cards} key={'section'}>
			<Card title='Hourly' style={cardStyles.hourly}>
				<Suspense fallback={<Skeleton />}>{isLoaded ? <AsyncHourly /> : <Skeleton />}</Suspense>
			</Card>
			<Card key='wind' title='Wind' style={cardStyles.wind}>
				{isLoaded ? <Wind /> : <Skeleton />}
			</Card>
			<Card title='Humidity' style={cardStyles.humidity}>
				{isLoaded && <Humidity />}
			</Card>
			<Card title='Sun position' style={cardStyles.sun}>
				{isLoaded ? <Sun /> : <Skeleton />}
			</Card>
			<Card title='Precipitation' style={cardStyles.precipitation}>
				<Suspense>{isLoaded ? <AsyncPrecipitation /> : <Skeleton />}</Suspense>
			</Card>
			<Card title='UV' style={cardStyles.uv}>
				{isLoaded ? <UV /> : <Skeleton />}
			</Card>
			<Card title='Daily' style={cardStyles.daily}>
				{isLoaded ? <Daily /> : <Skeleton />}
			</Card>
			<Card title='Moon' style={cardStyles.moon}>
				{isLoaded ? <Moon /> : <Skeleton />}
			</Card>
			<Card title='Pressure' style={cardStyles.pressure}>
				{isLoaded ? <Pressure /> : <Skeleton />}
			</Card>
			<Card title='Feeling' style={cardStyles.feeling}>
				{isLoaded ? <Feeling /> : <Skeleton />}
			</Card>
			<Card title='Visibility' style={cardStyles.visibility}>
				{isLoaded ? <Visibility /> : <Skeleton />}
			</Card>
			<Card title='Air quality' style={cardStyles.aqi}>
				{isLoaded ? <Aqi /> : <Skeleton />}
			</Card>
		</section>
	);
};

export default WeatherCards;
