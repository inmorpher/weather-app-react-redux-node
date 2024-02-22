type sunDefinitionReturn = {
	range: number;
	value: number;
	isDay: boolean;
};

export const sunDefinition = (sunRise: number, sunSet: number, dt: number): sunDefinitionReturn => {
	let range = sunSet - sunRise;
	let value = dt - sunRise;
	let isDay = true;
	const nextSunRise = sunRise + 86400;
	const prevSunSet = sunSet - 86400;

	if (dt > sunSet) {
		range = nextSunRise - sunSet;
		value = dt - sunSet;
		isDay = false;
	}

	if (dt < sunRise) {
		range = sunRise - prevSunSet;
		value = dt - prevSunSet;
		isDay = false;
	}

	return {
		range,
		value,
		isDay,
	};
};
