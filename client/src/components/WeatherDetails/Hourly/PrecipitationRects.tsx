import React from 'react';

import { RectCoords } from '../../../utils/services/curves/types';

type PrecipitationRectsProps = {
	data: Array<RectCoords>;
};

const PrecipitationRects: React.FC<PrecipitationRectsProps> = ({ data }) => {
	return (
		<g data-tag='precipitation-rects'>
			{data.map((item, index) => {
				if (item.height === 0) return;
				return (
					<rect
						key={item.x + index}
						x={item.x - 10}
						y={item.y}
						width={item.width}
						height={item.height}
						fill='url(#rectGrad)'
						ry='5px'
						rx='5px'
					/>
				);
			})}
		</g>
	);
};

export default PrecipitationRects;
