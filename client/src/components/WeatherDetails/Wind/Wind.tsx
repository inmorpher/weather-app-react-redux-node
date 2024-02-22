import classNames from 'classnames';
import { useAnimateAppearance } from '../../../hooks/useAnimateAppearance';
import { useAppSelector } from '../../../store/hooks.type';
import { selectWind } from '../../../store/slices/weatherSlice';
import globalStyles from '../../../utils.module.scss';
import cardStyles from '../../UI/Card/Card.module.scss';

const Wind = () => {
	const visible = useAnimateAppearance();
	const { deg, speed, gust, literal } = useAppSelector(selectWind);

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
				<svg
					width='40'
					height='40'
					viewBox='0 0 40 40'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className={cardStyles.card__labeled__icon__svg}
				>
					<circle cx='20' cy='20' r='19' stroke='white' strokeWidth='2' />
					<path
						d='M13 30L20 9L27 30L20 23L13 30Z'
						fill='white'
						stroke='white'
						strokeLinejoin='round'
						transform={`rotate(${deg})`}
						transform-origin='center'
					/>
				</svg>
				<span className={cardStyles.card__labeled__icon__label}>{literal}</span>
			</div>
			<div className={cardStyles.card__description}>
				<span>
					speed: {speed.value}
					{speed.units}
				</span>
				{gust && (
					<span>
						gust: {gust.value}
						{gust.units}
					</span>
				)}
			</div>
		</div>
	);
};

export default Wind;
