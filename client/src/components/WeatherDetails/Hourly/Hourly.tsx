import classNames from 'classnames';
import { useAnimateAppearance } from '../../../hooks/useAnimateAppearance';
import { useAppSelector } from '../../../store/hooks.type';
import { selectHourlyWeather } from '../../../store/slices/weatherSlice';
import globalStyles from '../../../utils.module.scss';
import ChartCurve from './ChartCurve';
import ChartTimeLine from './ChartTimeLine';
import styles from './Hourly.module.scss';
import PrecipitationDescription from './PrecipitationDescription';
import PrecipitationRects from './PrecipitationRects';
import Scale from './Scale';
import WeatherDescription from './WeatherDescription';

const Hourly = () => {
	const visible = useAnimateAppearance();

	const { scale, curve, precipitationDesc, precipitationRects, timeLine, wetherDesc } =
		useAppSelector(selectHourlyWeather);

	return (
		<div
			className={classNames(
				styles.hourly__wrapper,
				globalStyles.transition,
				visible ? globalStyles.v : globalStyles.u,
				globalStyles.flex
			)}
		>
			<div className={styles.hourly__scale}>
				{/* Scale */}
				<Scale data={scale} />
			</div>
			<div className={styles.hourly__chart}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className={styles.hourly__chart__svg}
					id='svgChart'
					viewBox='0 0 3000 300'
				>
					<defs>
						<linearGradient id='rectGrad' gradientTransform='rotate(90)'>
							<stop offset='0%' stopColor='#53D7EF' />
							<stop offset='100%' stopColor='#90E0EF' />
						</linearGradient>
						<linearGradient id='chartStroke' gradientTransform='rotate(90)'>
							<stop offset='0%' stopColor='#FD76B7' />
							<stop offset='100%' stopColor='#ffa6d1' />
						</linearGradient>
						<filter id='shadowRect' x='-10%' y='-10%' width='120%' height='140%'>
							<feDropShadow dx='0' dy='0' stdDeviation='1' floodColor='#1d1d1d' />
						</filter>
					</defs>
					{/* Precipitation rects */}
					<PrecipitationRects data={precipitationRects} />
					{/* Chart line */}
					<ChartCurve data={curve.mainCurve} />
					{/* Precipitation description */}
					<PrecipitationDescription data={precipitationDesc} />
					{/* Chart time line */}
					<ChartTimeLine data={timeLine} />
					{/* Weather description */}
					<WeatherDescription data={wetherDesc} />
					{/* Underline */}
					<g data-tag='underline'>
						<line
							x1='-10'
							y1='269px'
							x2='3010'
							y2='269px'
							stroke='white'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</g>
				</svg>
			</div>
		</div>
	);
};

export default Hourly;
