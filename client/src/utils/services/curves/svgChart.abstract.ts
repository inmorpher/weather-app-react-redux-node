import { Curve, CurveType, DataCoords, TimeLineCoords } from './types';

type CurveParamsType = {
	top: number;
	bottom: number;
	height: number;
	width: number;
	left: number;
};

export abstract class SVGChart<T> {
	protected chartHeight: number;
	protected chartWidth: number;
	protected chartBottom = 0;
	protected curveHeight = 0;
	protected data: Curve<T>;
	protected dataCoords: Array<DataCoords> = [];
	protected leftOffset = 0;
	protected alpha = 1;
	protected timezone: string | undefined;
	protected curve = '';
	protected curveParams: CurveParamsType;
	constructor(data: Curve<T>, width: number, height: number) {
		this.data = data;
		this.chartHeight = height;
		this.chartWidth = width;
		this.curveParams = { bottom: 0, left: 0, height: 0, top: 0, width: 0 };
	}

	protected generateCurve(): string {
		const alpha = this.alpha ? this.alpha : 1;
		const data = this.dataCoords;
		let curve = `M${data[0].x} ${data[0].y}`;
		for (let i = 0; i < data.length - 2; i++) {
			const p0 = data[i === 0 ? i : i - 1];
			const p1 = data[i];
			const p2 = data[i + 1];
			const p3 = data[i + 2] || data[i + 1];
			const cp1x = p1.x + ((p2.x - p0.x) / 6) * alpha;
			const cp1y = p1.y + ((p2.y - p0.y) / 6) * alpha;
			const cp2x = p2.x - ((p3.x - p1.x) / 6) * alpha;
			const cp2y = p2.y - ((p3.y - p1.y) / 6) * alpha;
			curve += 'C' + [cp1x, cp1y, cp2x, cp2y, p2.x, p2.y];
			if (i === data.length - 3) {
				curve += `S ${data[data.length - 2].x} ${data[data.length - 2].y} ${
					data[data.length - 1].x
				} ${data[data.length - 1].y}`;
			}
		}

		return curve;
	}

	/* 
		Method return main curve and combining back path curve
		@param {boolean}: backPath;

		@return {CurveType}: {
			mainCurve,
			backPathCurve: optional
		}
	*/

	public drawCurve(backPath = false): CurveType {
		const mainCurve = this.curve;
		let path = '';
		if (backPath) {
			path = `M ${this.dataCoords[0].x} ${this.chartHeight},
			L ${this.dataCoords[0].x} ${this.dataCoords[0].y},
			${mainCurve}
			L ${this.dataCoords[this.dataCoords.length - 1].x} ${this.chartHeight},
			L ${this.dataCoords[0].x} ${this.chartHeight},
			Z
			`;
		}

		return { mainCurve, backPathCurve: path && path };
	}
	abstract getTimeLine(): Array<TimeLineCoords>;
}
