export type DailyScaleType = {
	lineWidth: number;
	minTemp: number;
	maxTemp: number;
};

export const getDailyScaleCoords = (
	lineWidth: number,
	minTemp: number,
	maxTemp: number,
	value: number
): number => {
	const scaleStep = lineWidth / (maxTemp - minTemp);

	return (value - minTemp) * scaleStep;
};
