import { useEffect, useRef } from 'react';
import style from './style.module.scss';

type CurveProps = {
	mainCurve: string;
	backCurve?: string;
};

const CurveComponent = ({ mainCurve, backCurve }: CurveProps) => {
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		if (pathRef.current) {
			const pathLength = pathRef.current.getTotalLength().toString();
			pathRef.current.style.setProperty('--path', pathLength);
		}
	}, [mainCurve]);

	return (
		<g data-type='precipitation-curve'>
			<path
				className={style.precipitation_back_path}
				d={backCurve}
				fill='url(#verticalGradient)'
				mask='url(#mask)'
			/>
			<path
				ref={pathRef}
				className={style.precipitation_path}
				d={mainCurve}
				strokeLinejoin='round'
				strokeLinecap='round'
				fill='none'
				strokeWidth={3}
				stroke='url(#verticalGradient)'
			/>
		</g>
	);
};

export default CurveComponent;
