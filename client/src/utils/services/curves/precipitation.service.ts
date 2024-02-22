import { TimeService } from '../time/time.service';
import { SVGChart } from './svgChart.abstract';
import { AxisType, PrecipitationData, TimeLineCoords } from './types';

export class PrecipitationService extends SVGChart<PrecipitationData[]> {
	private timeLineCoords: Array<TimeLineCoords> = [];
	constructor(data: Array<PrecipitationData>, timezone: string) {
		super(data, 350, 118);
		this.timezone = timezone;
		this.curveParams.height = this.chartHeight * 0.75;
		this.curveParams.width = 305;
		this.curveParams.bottom = this.chartHeight - 5;
		this.curveParams.left = 25;
		this.init();
	}

	/* 
		Method calculate coordinates on the scale accordingly date it receive,
		calculating pixels per step and pushing time stamp 6 times for 60 min,

		@return {void};
	*/

	private calcCoords(): void {
		const pixPerStepX = this.curveParams.width / this.data.length;
		const pixPerStepY = this.curveParams.height / 10;

		this.data.forEach((item, index) => {
			const x = pixPerStepX * index + this.curveParams.left;
			this.dataCoords.push({
				x,
				y: this.curveParams.bottom - item.precipitation * pixPerStepY,
			});

			if (index % 15 === 0 || index + 1 == 60) {
				this.timeLineCoords.push({
					time: new TimeService(item.dt, this.timezone).getTime('hoursAndMinutes').result(),
					description: index === 0 ? 'now' : index + ' min',
					x,
					y: 12,
					y2: this.chartHeight,
				});
			}
		});
	}

	/* 
		Method returns array of coordinates for time line 

		@return {Array<TimeLineCoords>}: Array <
			@time: string;
			@description: string;
			@x: number;
			@y: number;
	>
	*/

	getTimeLine(): Array<TimeLineCoords> {
		return this.timeLineCoords;
	}

	/* 
		Method return array of horizontal lines coordinates

		@return {Array<AxisType>} : Array<
				@y: number,
				@value: number
		>

	*/

	getAxis(): Array<AxisType> {
		const range = this.curveParams.height / 10;
		return Array.from({ length: 6 }, (_, i) => i * 2).map((value) => ({
			y: this.chartHeight - range * value - 5,
			value,
		}));
	}

	/* 
		Init method initialize calculation of coords and generate curve;

		@return {void}
	*/

	private init(): void {
		this.calcCoords();
		this.curve = this.generateCurve();
	}
}
