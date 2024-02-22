import { PrecipitationDesc } from '../../../utils/services/definitions/precipitation.definition';

type GradientMaskProps = {
	colors: Array<PrecipitationDesc>;
};

const GradientMaskComponent = ({ colors }: GradientMaskProps) => {
	return (
		<defs>
			<linearGradient
				id='verticalGradient'
				x1='0'
				y1='100%'
				x2='0'
				y2='0'
				gradientUnits='userSpaceOnUse'
			>
				{colors.map((item, index) => {
					const range = 100 / colors.length;
					const stopOffset = Math.round(range * index) + '%';
					return <stop key={item.color + index} offset={stopOffset} stopColor={item.color} />;
				})}
			</linearGradient>
			<linearGradient
				id='backGradient'
				x1='0'
				y1='0'
				x2='0'
				y2='100%'
				gradientUnits='userSpaceOnUse'
			>
				<stop offset='50%' stopColor='white' stopOpacity='1' />
				<stop offset='85%' stopColor='transparent' stopOpacity='1' />
			</linearGradient>
			<mask id='mask'>
				<rect x='0' y='0' width='100%' height='100%' fill='url(#backGradient)' />
			</mask>
		</defs>
	);
};

export default GradientMaskComponent;
