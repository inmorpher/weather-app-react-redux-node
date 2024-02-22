import classNames from 'classnames';
import globalStyles from '../../../utils.module.scss';
import cardStyles from '../../UI/Card/Card.module.scss';

import { useDailyPopup } from '../../../hooks/useDailyPopup';
import Popup from '../../UI/Popup/Popup';

const Daily = () => {
	const { dailyValues, colors, listItemsRefs, listContainerRef, onOpenPopup } = useDailyPopup();

	return (
		<ul
			ref={listContainerRef}
			className={classNames(
				cardStyles.list,
				globalStyles.flex,
				globalStyles.flex__column,
				globalStyles.flex__evenly
			)}
		>
			<svg width={0} height={0} style={{ visibility: 'hidden' }}>
				<defs>
					<linearGradient id='temp-color-scale' x1='0' x2='135' gradientUnits='userSpaceOnUse'>
						{colors.map((color, index) => {
							const colorOffset = 100 / colors.length;
							return (
								<stop
									key={'temp-color' + index}
									offset={colorOffset * index + '%'}
									stopColor={color}
								/>
							);
						})}
					</linearGradient>
				</defs>
			</svg>
			{dailyValues.map((item, index) => (
				<li
					ref={(element) => {
						listItemsRefs.current[index] = element;
					}}
					key={'day' + index}
					className={classNames(globalStyles.grid, cardStyles.list__item)}
					onClick={() => onOpenPopup(index)}
				>
					<span className={cardStyles.list__item__date} style={{ fontWeight: !index ? '700' : '' }}>
						{index ? item.day : 'Today'}
					</span>

					<div
						className={classNames(
							cardStyles.list__item__temps,
							globalStyles.flex,
							globalStyles.flex__center,
							globalStyles.flex__align__center
						)}
					>
						<span>
							{item.dailyMin.value}
							{item.dailyMin.units}
						</span>

						<svg
							width='135'
							height='7'
							viewBox='0 0 135 8'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<line
								x1='0'
								y1='4'
								x2='135'
								y2='4'
								stroke='#ADADAD'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<line
								x1={item.coords[index].x1}
								y1='4'
								x2={item.coords[index].x2}
								y2='4'
								stroke='url(#temp-color-scale)'
								strokeWidth='6'
								strokeLinecap='round'
							/>
						</svg>
						<span>
							{item.dailyMax.value}
							{item.dailyMax.units}
						</span>
					</div>
					<img
						className={cardStyles.list__item__icon}
						src={`/icons/static/conditions/${item.icon}.svg`}
					/>
				</li>
			))}
			<Popup />
		</ul>
	);
};

export default Daily;
