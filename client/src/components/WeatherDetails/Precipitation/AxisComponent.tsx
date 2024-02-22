import React from 'react';
import { AxisType } from '../../../utils/services/curves/types';

type AxisProps = {
	axis: Array<AxisType>;
};

const AxisComponents = ({ axis }: AxisProps) => {
	return (
		<g data-type='horizontal_axis_lines'>
			{axis.map((axis, index) => {
				return (
					<React.Fragment key={'valueAndLine' + index}>
						<text
							key={'scaleValue' + index}
							x={15}
							y={axis.y}
							textAnchor='middle'
							alignmentBaseline='central'
							fontSize={'0.5rem'}
							letterSpacing={0.1}
							fill='white'
							opacity={0.7}
						>
							{axis.value}
						</text>
						<line
							key={'scaleLine' + index}
							x1={20}
							y1={axis.y}
							x2={340}
							y2={axis.y}
							stroke='white'
							strokeDasharray={2}
							strokeDashoffset={10}
							strokeWidth={0.1}
						/>
					</React.Fragment>
				);
			})}
		</g>
	);
};

export default AxisComponents;
