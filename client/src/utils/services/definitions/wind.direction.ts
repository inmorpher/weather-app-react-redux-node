export const getWindDirection = (windValue: number, type: 'full' | 'short' = 'short'): string => {
	// const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	const directions = [
		{
			short: 'N',
			full: 'North',
		},
		{
			short: 'NE',
			full: 'North-east',
		},
		{
			short: 'E',
			full: 'East',
		},
		{
			short: 'SE',
			full: 'South-east',
		},
		{
			short: 'S',
			full: 'South',
		},
		{
			short: 'SW',
			full: 'South-west',
		},
		{
			short: 'W',
			full: 'West',
		},
		{
			short: 'NW',
			full: 'North-west',
		},
	];

	const index = Math.round(windValue / 45) % 8;

	return type === 'short' ? directions[index].short : directions[index].full;
};
