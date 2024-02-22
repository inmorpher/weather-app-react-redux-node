import { PrecipitationRectDesc } from '../../../utils/services/curves/types';

type PrecipitationDescriptionProps = {
	data: Array<PrecipitationRectDesc>;
};

const PrecipitationDescription: React.FC<PrecipitationDescriptionProps> = ({ data }) => {
	return (
		<g data-tag='precipitation-description'>
			{data.map((item, index) => {
				return (
					<text key={'weather__desc' + index} x={item.popX} y={item.popY}>
						<tspan
							x={item.popX}
							fill='#90e0ef'
							fontSize='.6rem'
							textAnchor='middle'
							fontWeight='700'
							letterSpacing='1'
						>
							{item.pop}
						</tspan>
						{item.rain && (
							<tspan
								x={item.popX}
								dy='-10'
								fill='#90e0ef'
								fontSize='.6rem'
								textAnchor='middle'
								fontWeight='700'
								letterSpacing='1'
							>
								{item.rain + 'mm'}
							</tspan>
						)}
					</text>
				);
			})}
		</g>
	);
};

export default PrecipitationDescription;
