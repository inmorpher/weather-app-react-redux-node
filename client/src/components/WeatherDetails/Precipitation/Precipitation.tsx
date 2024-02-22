import { useAppSelector } from '../../../store/hooks.type';
import { selectPrecipitation } from '../../../store/slices/weatherSlice';

import AxisComponent from './AxisComponent';
import CurveComponent from './CurveComponent';
import GradientMaskComponent from './GradientMaskComponent';
import TimeLineComponent from './TimeLineComponent';

const Precipitation = () => {
	const { mainCurve, backCurve, gradientColors, timeLine, axis } =
		useAppSelector(selectPrecipitation);

	return (
		<svg width='100%' height='100%' viewBox='0 0 350 118' xmlns='http://www.w3.org/2000/svg'>
			{/* Definition gradients and mask */}
			<GradientMaskComponent colors={gradientColors} />
			{/* Vertical time line */}
			<TimeLineComponent timeLine={timeLine} />
			{/* Horizontal axis lines */}
			<AxisComponent axis={axis} />
			{/* Main and back path curves */}
			<CurveComponent mainCurve={mainCurve} backCurve={backCurve} />
		</svg>
	);
};

export default Precipitation;
