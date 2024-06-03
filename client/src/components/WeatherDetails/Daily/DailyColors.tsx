import { TempColorsDefinition } from '../../../utils/services/definitions/daily.temp.definition';

interface DailyColorProps {
	colors: TempColorsDefinition[];
}

const DailyColors = ({ colors }: DailyColorProps) => {
	return (
		<svg width={0} height={0} style={{ visibility: 'hidden' }}>
			<defs>
				<linearGradient
					id='temp-color-scale'
					x1='0'
					x2='135'
					gradientUnits='userSpaceOnUse'
				>
					{colors.map((color, index) => {
						const offset = `${(index * 100) / (colors.length - 1)}%`;

						return (
							<stop
								key={'temp-color' + index}
								offset={offset}
								stopColor={color.color}
							/>
						);
					})}
				</linearGradient>
			</defs>
		</svg>
	);
};

export default DailyColors;
