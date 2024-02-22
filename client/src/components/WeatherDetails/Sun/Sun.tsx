import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useAnimateAppearance } from '../../../hooks/useAnimateAppearance';
import { useAppSelector } from '../../../store/hooks.type';
import { selectSunPosition } from '../../../store/slices/weatherSlice';
import globalStyles from '../../../utils.module.scss';
import cardStyles from '../../UI/Card/Card.module.scss';

const Sun = () => {
	const { sunset, sunrise, range, value, isDay } = useAppSelector(selectSunPosition);

	const visible = useAnimateAppearance();

	const path = useRef<SVGPathElement>(null);
	const indicator = useRef<SVGCircleElement>(null);

	useEffect(() => {
		if (path.current && indicator.current) {
			const length = path.current.getTotalLength();
			const point = path.current.getPointAtLength((length * value) / range);
			indicator.current.setAttribute('cy', `${point.y}px`);
			indicator.current.setAttribute('cx', `${point.x}px`);
		}
	}, [value, range]);

	const dayPath = 'M 5 35C 5 35 85 -30 165 35';
	const nightPath = 'M 5 5C 5 5 85 70 165 5';

	return (
		<div
			className={classNames(
				cardStyles.card__content,
				globalStyles.flex,
				globalStyles.flex__column,
				globalStyles.transition,
				visible ? globalStyles.v : globalStyles.u
			)}
		>
			<div
				className={classNames(
					cardStyles.card__labeled__icon,
					globalStyles.flex,
					globalStyles.flex__align__center
				)}
			>
				<svg viewBox='0 0 170 40' width='100%' height='100%'>
					<defs>
						<radialGradient id='white-to-transparent' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
							<stop offset='30%' stopColor='white' stopOpacity='1' />
							<stop offset='100%' stopColor='white' stopOpacity='0' />
						</radialGradient>
					</defs>
					<path
						ref={path}
						id='sun-path'
						d={isDay ? dayPath : nightPath}
						fill='none'
						stroke={isDay ? '#FFF' : '#B8B8B8'}
						strokeWidth={isDay ? 0.7 : 0.5}
					/>

					<circle
						ref={indicator}
						id='sun-indicator'
						r='10'
						fill={isDay ? 'url(#white-to-transparent)' : 'var(--main-gradient-color-start)'}
					/>
				</svg>
			</div>
			<div className={classNames(cardStyles.card__description, cardStyles.position)}>
				{isDay ? (
					<>
						<span className={cardStyles.rise}>{sunrise}</span>
						<span className={cardStyles.set}>{sunset}</span>
					</>
				) : (
					<>
						<span className={cardStyles.set}>{sunset}</span>
						<span className={cardStyles.rise}>{sunrise}</span>
					</>
				)}
			</div>
		</div>
	);
};

export default Sun;
