import { ScaleReturn } from '../../../utils/services/definitions/svgScale.definition';

type SvgScaleProps = {
	data: ScaleReturn;
	type: string;
};

const SvgScale: React.FC<SvgScaleProps> = ({ data, type }) => {
	const indicatorW = 21;
	const scaleData = {
		pX: 0,
		pY: 2.5,
		length: 200,
		height: 20,
	};
	const dataLength = type === 'aqi' ? 5 : 11;
	// const range = (scalePosition.width - indicatorW) / dataLength;
	// const indicatorX = data.values ? range * data.values.value - indicatorW * 1.5 : 0;
	// const indicatorX = data.values?.value ? range
	const adjustedScaleLength = scaleData.length - indicatorW;
	// const positionOnScale = ((x - 1) * adjustedScaleLength) / (5 - 1);
	const pointerCoord = data.values
		? ((data.values?.value - 1) * adjustedScaleLength) / (dataLength - 1)
		: 0;

	return (
		<svg viewBox='0 0 200 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<defs>
				<linearGradient id={`${type}-gradient`} x1='0' x2='200' gradientUnits='userSpaceOnUse'>
					{data.colors.map((color, index) => {
						const range = 100 / data.colors.length + 1;
						const stopOffset = Math.round(range * index) + '%';
						return <stop key={type + color} offset={stopOffset} stopColor={color} />;
					})}
				</linearGradient>
				<rect
					id={`${type}-scale-indicator`}
					x={pointerCoord}
					y='2'
					width={indicatorW}
					height='21'
					rx='50'
					ry='50'
					strokeWidth='10'
					stroke='#fff'
				/>
				<clipPath id={`${type}-inner-stroke`}>
					<use xlinkHref={`#${type}-scale-indicator`}></use>
				</clipPath>
			</defs>
			<rect x='0' y='2.5' width='200' height='20' fill={`url(#${type}-gradient)`} rx='10' />
			<use xlinkHref={`#${type}-scale-indicator`} clipPath={`url(#${type}-inner-stroke)`} />
		</svg>
	);
};

export default SvgScale;
