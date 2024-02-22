import { WeatherDescription } from '../../../utils/services/curves/types';

type WeatherDescriptionProps = {
	data: Array<WeatherDescription>;
};

const WeatherDescription: React.FC<WeatherDescriptionProps> = ({ data }) => {
	return (
		<g data-tag='weather-description'>
			{data.map((item, index) => {
				return (
					<text key={'weatherDesc' + index} x={item.pX} y='270'>
						{item.value.map((elem, i) => {
							return (
								<tspan
									key={'values' + i + 'tspan' + index}
									x={item.pX}
									dy='7.5'
									textAnchor='middle'
									fontSize='.5rem'
									fill='#fff'
									letterSpacing='1.5'
								>
									{elem}
								</tspan>
							);
						})}
					</text>
				);
			})}
		</g>
	);
};

export default WeatherDescription;
