type ChartCurveProps = {
	data: string;
};

const ChartCurve: React.FC<ChartCurveProps> = ({ data }) => {
	return (
		<g data-tag='chart-curve'>
			<path
				fill='none'
				strokeLinecap='round'
				strokeLinejoin='round'
				stroke='url(#chartStroke)'
				d={data}
			/>
			1
		</g>
	);
};

export default ChartCurve;
