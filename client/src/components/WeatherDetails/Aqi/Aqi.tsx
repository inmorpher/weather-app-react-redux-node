import classNames from 'classnames';
import { useAnimateAppearance } from '../../../hooks/useAnimateAppearance';
import { useAppSelector } from '../../../store/hooks.type';
import { selectAqi } from '../../../store/slices/weatherSlice';
import globalStyles from '../../../utils.module.scss';
import { ScaleType } from '../../../utils/services/definitions/svgScale.definition';
import cardStyles from '../../UI/Card/Card.module.scss';
import SvgScale from '../../UI/SvgScale/SvgScale';
const Aqi = () => {
	const visible = useAnimateAppearance();

	const aqi = useAppSelector(selectAqi);

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
				<div
					className={cardStyles.card__labeled__icon__text}
					style={{ color: aqi.values?.color || '#fff' }}
				>
					<span>{aqi.values?.value || 'N/A'}</span>
				</div>
				<div className={classNames(cardStyles.card__labeled__icon__label, cardStyles.smaller)}>
					<span>{aqi.values?.level || 'N/A'}</span>
				</div>
			</div>
			<div className={cardStyles.card__description}>
				<SvgScale data={aqi} type={ScaleType.aqi} />
			</div>
		</div>
	);
};

export default Aqi;
