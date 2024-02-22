import { TimeLineCoords } from '../../../utils/services/curves/types';

type ChartTimeLineProps = {
	data: Array<TimeLineCoords>;
};
const ChartTimeLine: React.FC<ChartTimeLineProps> = ({ data }) => {
	return (
		<g data-tag='chart-time-line'>
			{data.map((item, index) => {
				return (
					<text
						key={item.time + index}
						x={item.x}
						y={item.y}
						textAnchor='middle'
						fontSize='.8rem'
						fill='#fff'
						letterSpacing='.5'
					>
						{item.time}
					</text>
				);
			})}
		</g>
	);
};

export default ChartTimeLine;
