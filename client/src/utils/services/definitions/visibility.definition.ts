type VisibilityRange = {
	max: number;
	min: number;
	value: string;
};

type ReturnVisibility = {
	range: string;
	distance: string;
};

const visibilityRanges: Array<VisibilityRange> = [
	{ max: 10000, min: 9000, value: 'clear' },
	{ max: 8999, min: 4000, value: 'light haze' },
	{ max: 3999, min: 2000, value: 'haze' },
	{ max: 1999, min: 1000, value: 'thin fog' },
	{ max: 999, min: 500, value: 'light fog' },
	{ max: 499, min: 200, value: 'moderate fog' },
	{ max: 199, min: 50, value: 'thick fog' },
	{ max: 49, min: 0, value: 'dense fog' },
];

export const getVisibilityValue = (value: number): ReturnVisibility => {
	const range = visibilityRanges.find((range) => value >= range.min && value <= range.max);
	const distance = value >= 1000 ? parseFloat((value / 1000).toFixed(1)) + 'km' : value + 'm';
	return {
		range: range ? range.value : 'not available',
		distance,
	};
};
