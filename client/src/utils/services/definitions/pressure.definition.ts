export const pressureDefinition = (pressure: number, lines = 30) => {
	const cx = 80;
	const cy = 70;
	const radius = 60;
	const minPressure = 850;
	const maxPressure = 1100;
	const range = maxPressure - minPressure;
	const startAngle = -105;
	const scaleStep = range / (startAngle * 2);
	const calcPressure = startAngle - (pressure - minPressure) / scaleStep;

	const coords = Array.from({ length: lines }).map((_, index) => {
		const angle = (index / lines) * 380;
		const radians = (angle + 91.5 * Math.PI) / 100;
		return {
			x1: cx + radius * Math.cos(radians),
			y1: cy + radius * Math.sin(radians),
			x2: cx + (radius - 15) * Math.cos(radians),
			y2: cy + (radius - 15) * Math.sin(radians),
		};
	});
	return {
		pressure: pressure,
		angle: calcPressure,
		coords,
	};
};
