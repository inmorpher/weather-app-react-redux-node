export type MetricValue = 'metric' | 'imperial';

export type MetricReturnType = {
	value: number;
	units: string;
};
export type UnitsValue = 'none' | 'short' | 'full';

/* 
	@@@Static@@@
	Class Metric Convertor converting income Speed and Tempriture to a converted values;

	
*/
export class MetricConverter {
	/* Private static method for validating data */
	private static argsCheck(value: number, metric: MetricValue): void {
		if (typeof value !== 'number') {
			throw new Error('Value missing or wrong type. Please use NUMBER');
		}
		if (!metric || (metric !== 'imperial' && metric !== 'metric')) {
			throw new Error('Metric type missing or wrong type. Please use "metric" or "imperial"');
		}
	}

	private static calcTemp(
		value: number,
		metric: MetricValue,
		units: UnitsValue = 'none'
	): MetricReturnType {
		if (metric === 'imperial') {
			return {
				value: Math.round(((value - 273.15) * 9) / 5 + 32),
				units: units === 'full' ? '°F' : units === 'short' ? '°' : units === 'none' ? '' : '',
			};
		} else if (metric === 'metric') {
			return {
				value: Math.round(value - 273.15),
				units: units === 'full' ? '°C' : units === 'short' ? '°' : units === 'none' ? '' : '',
			};
		} else {
			throw new Error('Metric type unknown or missing. Use "metric" or "imperial"');
		}
	}

	private static calcSpeed(value: number, metric: MetricValue, units = false): MetricReturnType {
		if (metric === 'imperial') {
			return {
				value: Number((value * 2.23694).toFixed(1)),
				units: units ? 'm/h' : '',
			};
		} else if (metric === 'metric') {
			return {
				value: value,
				units: units ? 'm/s' : '',
			};
		} else {
			throw new Error('Metric type unknown or missing. Use "metric" or "imperial"');
		}
	}

	/* 
		Static method return formate tempriture values
		
		Args: 
			@value: number, 
			@metric: 'metric'|'imperial'
			@units: 'none'|'short'|'full'

		@@Return {value: number, units?:string}	
	*/
	static getTemp(value: number, metric: MetricValue, units: UnitsValue = 'none'): MetricReturnType {
		this.argsCheck(value, metric);

		return this.calcTemp(value, metric, units);
	}
	static getTemps(
		value: number[],
		metric: MetricValue,
		units: UnitsValue = 'none'
	): MetricReturnType[] {
		return value.map((item) => this.calcTemp(item, metric, units));
	}
	/* 
		Static method return formate speed values
		
		Args: 
			@value: number, 
			@metric: 'metric'|'imperial'
			@units: boolean

		@@Return {value: number, units?:string}	
	*/
	static getSpeed(value: number, metric: MetricValue, units = false): MetricReturnType {
		this.argsCheck(value, metric);

		return this.calcSpeed(value, metric, units);
	}
}
// °
