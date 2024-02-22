import { UserUnits } from '../../../store/slices/userSlice';
import { MetricConverter } from '../converter/metric.converter';
import { TimeService } from '../time/time.service';
import { SVGChart } from './svgChart.abstract';
import {
	DataCoords,
	HourlyWeatherData,
	RectCoords,
	ScaleCoords,
	TimeLineCoords,
	WeatherDescription,
} from './types';

export class HourlyChart extends SVGChart<HourlyWeatherData[]> {
	private minVal = 0;
	private maxVal = 0;
	private metric: UserUnits;
	private chartTop: number;
	private rectCoords: Array<RectCoords> = [];
	private rectBottom = 270;
	constructor(data: HourlyWeatherData[], timezone: string, metric: UserUnits) {
		super(data, 3000, 300);
		this.metric = metric;
		this.timezone = timezone;
		this.curveParams.height = this.chartHeight * 0.5;
		this.chartTop = (this.chartHeight - this.curveParams.height) / 2;
		this.curveParams.bottom = this.curveParams.height + this.chartTop;
		this.curveParams.left = 20;
		this.dataCoords = [];
		this.init();
	}

	/*
		Method return calc of scale in actual data

		@return {Array<ScaleCoords>}: {
			temperatureRange:string,
			pX: number,
			pY: number,
		}
	*/
	getScale(): Array<ScaleCoords> {
		const rangeValue = 4;
		const range = (this.maxVal - this.minVal) / rangeValue;
		const res = [];

		const posX = 15;
		for (let i = 0; i <= rangeValue; i++) {
			const tempValue = MetricConverter.getTemp(this.minVal, this.metric, 'short');
			const value = Math.round(tempValue.value + range * i);
			const units = tempValue.units;
			const pX = posX;
			const pY = this.curveParams.bottom - (this.curveParams.height / rangeValue) * i;

			res.push({
				value,
				units,
				pX,
				pY,
			});
		}

		return res;
	}

	/*
		Private method calculating coords of temperatures

		@return{Array<DataCoords>}: {
			x: number,
			y: number
		}
	*/
	private calcCoords(): Array<DataCoords> {
		const curveLeft = 40;

		this.minVal = Math.min(...this.data.map((elem) => elem.temp));
		this.maxVal = Math.max(...this.data.map((elem) => elem.temp));

		const range = this.maxVal - this.minVal;
		const pixPerStepX = (this.chartWidth - curveLeft) / this.data.length;
		const pixPerStepY = this.curveParams.height / range;

		return this.data.map((item, index) => ({
			x: curveLeft + pixPerStepX * index,
			y: this.curveParams.bottom - (item.temp - this.minVal) * pixPerStepY,
		}));
	}

	/*
		Private method calculating coords for precipitation rectangles with bottom line on 269

		@return{Array<RectCoords>}: {
			x: number,
			y: number,
			width: number,
			height: number,
		}
	*/
	private calcPrecipitationRects(): Array<RectCoords> {
		const precipitationHeight = this.chartHeight * 0.6;
		const range = precipitationHeight / 100;
		return this.data.map((item, index) => {
			const posX = this.dataCoords[index].x;
			const posY = this.rectBottom - item.pop * 100 * range;
			return {
				x: posX,
				y: posY,
				width: 20,
				height: this.rectBottom - posY,
			};
		});
	}

	/*
		Method returns timestamps in hours format
		@NOTE: Of time == 00 it will return Date and month (Jun 12)

		@return{Array<TimeLineCoords>}: {
			time: string,
			x: number,
			y: number,
		}
	*/
	getTimeLine(): Array<TimeLineCoords> {
		return this.dataCoords.map((item, index) => ({
			time: new TimeService(this.data[index].dt, this.timezone).getTime('hours', true).result(),
			x: item.x,
			y: 12,
		}));
	}

	/*
		Method returns weather condition description in human language (heavy rain, sunny, etc...)
		Breaking description into array of words
		@returns{Array<WeatherDescription>}: {
			value: Array<String>,
			pX: number,
			pY: number,
		}
	*/
	getWeatherDescription(): Array<WeatherDescription> {
		return this.dataCoords.map((item, index) => {
			const weatherConditionByWord = this.data[index].weather[0].description.split(' ');

			return {
				value: weatherConditionByWord,
				pX: item.x,
				pY: item.y,
			};
		});
	}

	/*
		Method returns coordinates for precipitation rectangles

		@return {Array<RectCoords>}: {
			x: number,
			y: number,
			width: number,
			height: number,
		}
	*/
	getPrecipitationRects(): Array<RectCoords> {
		return this.rectCoords;
	}

	getPrecipitationDescription() {
		return this.rectCoords.map((item, index) => {
			const rain = this.data[index].rain;
			const pop = Math.round(this.data[index].pop * 100) + '%';
			return {
				rain: rain ? rain['1h'] : undefined,
				rainX: item.x,
				rainY: item.y - 22,
				pop,
				popX: item.x,
				popY: item.y - 10,
			};
		});
	}

	/*
		Method returns coordinates of the bottom line

		@return {number}: number
	*/
	getRectBottom(): number {
		return this.rectBottom;
	}

	/*
		Initial private method for initialization
	*/
	private init(): void {
		this.dataCoords = this.calcCoords();
		this.rectCoords = this.calcPrecipitationRects();
		this.curve = this.generateCurve();
	}
}
