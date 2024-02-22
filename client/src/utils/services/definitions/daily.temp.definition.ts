import { UserUnits } from '../../../store/slices/userSlice';

export type TempColorsDefinition = {
	metric: {
		min: number;
		max: number;
	};
	imperial: {
		min: number;
		max: number;
	};
	level: string;
	color: string;
};

const tempColors: Array<string> = [
	'#2a52be',
	'#007aa5',
	'#30CC14',
	'#ffff31',
	'#EA7211',
	'#E70F12',
];

const tempData: Array<TempColorsDefinition> = [
	{
		metric: {
			min: -100,
			max: 0,
		},
		imperial: {
			min: -148,
			max: 32,
		},
		level: 'extremely cold',
		color: tempColors[0],
	},
	{
		metric: {
			min: 0,
			max: 15,
		},
		imperial: {
			min: 32,
			max: 59,
		},
		level: 'cold',
		color: tempColors[1],
	},
	{
		metric: {
			min: 15,
			max: 20,
		},
		imperial: {
			min: 59,
			max: 68,
		},
		level: 'moderate',
		color: tempColors[2],
	},
	{
		metric: {
			min: 20,
			max: 25,
		},
		imperial: {
			min: 68,
			max: 77,
		},
		level: 'slightly warm',
		color: tempColors[3],
	},
	{
		metric: {
			min: 25,
			max: 30,
		},
		imperial: {
			min: 77,
			max: 86,
		},
		level: 'warm',
		color: tempColors[4],
	},
	{
		metric: {
			min: 30,
			max: 100,
		},
		imperial: {
			min: 86,
			max: 212,
		},
		level: 'warm',
		color: tempColors[5],
	},
];

export const getTempritureScale = (minValue: number, maxValue: number, metric: UserUnits) => {
	const data = tempData.filter(
		(item) => item[metric].min <= maxValue && item[metric].max >= minValue
	);
	return data;
};
