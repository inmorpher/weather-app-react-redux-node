import { ScaleCoords } from '../../../utils/services/curves/types';
import styles from './Hourly.module.scss';

type props = {
	data: Array<ScaleCoords>;
};

const Scale: React.FC<props> = ({ data }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={styles.hourly__scale__svg}
			viewBox='0 0 30 300'
		>
			{data.map((item, index) => {
				return (
					<text
						key={2 + index}
						x={item.pX}
						y={item.pY}
						fill='#fff'
						fontSize='.7rem'
						fontWeight='700'
						dominantBaseline='top'
						textAnchor='middle'
					>
						{item.value}
						{item.units}
					</text>
				);
			})}
		</svg>
	);
};

export default Scale;
