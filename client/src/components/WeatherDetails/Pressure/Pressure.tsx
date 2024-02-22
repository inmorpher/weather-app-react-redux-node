import { useAppSelector } from '../../../store/hooks.type';

import classNames from 'classnames';
import { useAnimateAppearance } from '../../../hooks/useAnimateAppearance';
import { selectPressure } from '../../../store/slices/weatherSlice';
import globalStyles from '../../../utils.module.scss';
import cardStyles from '../../UI/Card/Card.module.scss';
const Pressure = () => {
	const visible = useAnimateAppearance();

	const { pressure, angle, coords } = useAppSelector(selectPressure);

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
					globalStyles.flex__align__center,

					globalStyles.flex__center
				)}
			>
				<svg width='162px' height='108px' viewBox='0 0 160 100' xmlns='http://www.w3.org/2000/svg'>
					{coords.map((line, index) => {
						return (
							<line
								key={'pressure-line' + index}
								x1={line.x1}
								y1={line.y1}
								x2={line.x2}
								y2={line.y2}
								stroke='white'
								strokeLinecap='round'
								strokeWidth='1'
							/>
						);
					})}
					<g
						style={{
							transform: `rotate(${angle}deg)`,
							transformOrigin: `${80}px ${70}px`,
						}}
					>
						<circle cx={`${80}px`} cy={`${70}px`} r={60} stroke='none' fill='none'></circle>
						<line
							x1={80}
							x2={80}
							y1={5}
							y2={30}
							stroke='#53D7EF'
							strokeWidth={4}
							strokeLinecap='round'
						></line>
					</g>
				</svg>
			</div>
			<div className={cardStyles.card__description}>{pressure}hpa</div>
		</div>
	);
};

export default Pressure;
