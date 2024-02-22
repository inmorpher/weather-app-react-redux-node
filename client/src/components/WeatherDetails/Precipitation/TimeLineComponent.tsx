import { Fragment } from 'react';
import { TimeLineCoords } from '../../../utils/services/curves/types';

type TimeLineProps = {
	timeLine: Array<TimeLineCoords>;
};

const TimeLineComponent = ({ timeLine }: TimeLineProps) => {
	return (
		<g data-type='vertical_time_axis'>
			{timeLine.map((item, index) => {
				return (
					<Fragment key={'Vertical_axis' + index}>
						<line
							key={'timeline' + index}
							x1={item.x}
							y1={item.y + 3}
							x2={item.x}
							y2={item.y2}
							stroke='white'
							strokeOpacity={1}
							strokeWidth={0.1}
						/>
						<text
							key={'timestamp' + index}
							x={item.x}
							y={item.y + 2}
							textAnchor='middle'
							fill='white'
							fontSize={'0.5rem'}
							letterSpacing={0.1}
							opacity={0.7}
						>
							<tspan x={item.x}>{item.description}</tspan>
							<tspan x={item.x} dy={-8}>
								{item.time}
							</tspan>
						</text>
					</Fragment>
				);
			})}
		</g>
	);
};

export default TimeLineComponent;
