import classNames from 'classnames';
import { useAnimateAppearance } from '../../../hooks/useAnimateAppearance';
import { useAppSelector } from '../../../store/hooks.type';
import { selectMoonPosition } from '../../../store/slices/weatherSlice';
import globalStyles from '../../../utils.module.scss';
import cardStyles from '../../UI/Card/Card.module.scss';

const Moon = () => {
	const visible = useAnimateAppearance();

	const { desc, moonPhase, moonRise, moonSet } = useAppSelector(selectMoonPosition);

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
					className='icon moon'
					width='58'
					height='48'
					viewBox='0 0 58 48'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<circle cx={'50%'} cy={'50%'} r='23' fill='transparent' stroke='white' strokeWidth='2' />
					<mask
						id='mask0_65_206'
						style={{ maskType: 'luminance' }}
						maskUnits='userSpaceOnUse'
						x='1'
						y='0'
						width='50'
						height='46'
					>
						<circle cx={'50%'} cy={'50%'} r='23' fill='white' />
					</mask>
					<g mask='url(#mask0_65_206)'>
						<circle cx={`${moonPhase}%`} cy={'50%'} r='23' fill='white' strokeWidth='2' />
					</g>
				</svg>
				<div className={classNames(cardStyles.card__labeled__icon__label, cardStyles.smaller)}>
					{desc}
				</div>
			</div>
			<div className={classNames(cardStyles.card__description, cardStyles.position)}>
				<span className={cardStyles.rise}>{moonRise}</span>
				<span className={cardStyles.set}>{moonSet}</span>
			</div>
		</div>
	);
};

export default Moon;
