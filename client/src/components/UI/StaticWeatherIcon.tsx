import { ImgHTMLAttributes } from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

type IconCode = {
	src: string;
	alt: string;
};

const iconVariants = cva('w-5 h-5', {
	variants: {
		variant: {
			default: 'bg-none',
		},
		size: {
			medium: 'w-6 h-6',
			small: 'w-5 h-5',
		},
		defaultVariants: {
			variant: 'default',
			size: 'medium',
		},
	},
});

const iconCodes: Record<string, IconCode> = {
	'01d': {
		src: '/icons/static/conditions/01d.svg',
		alt: 'clear sky',
	},
	'02d': {
		src: '/icons/static/conditions/02d.svg',
		alt: 'few clouds',
	},
	'03d': {
		src: '/icons/static/conditions/03d.svg',
		alt: 'scattered clouds',
	},
	'04d': {
		src: '/icons/static/conditions/04d.svg',
		alt: 'broken clouds',
	},
	'09d': {
		src: '/icons/static/conditions/09d.svg',
		alt: 'shower rain',
	},
	'10d': {
		src: '/icons/static/conditions/10d.svg',
		alt: 'rain',
	},
	'11d': {
		src: '/icons/static/conditions/11d.svg',
		alt: 'thunderstorm',
	},
	'13d': {
		src: '/icons/static/conditions/13d.svg',
		alt: 'snow',
	},
	'50d': {
		src: '/icons/static/conditions/50d.svg',
		alt: 'fog',
	},
	'01n': {
		src: '/icons/static/conditions/01n.svg',
		alt: 'clear sky',
	},
	'02n': {
		src: '/icons/static/conditions/02n.svg',
		alt: 'few clouds',
	},
	'03n': {
		src: '/icons/static/conditions/03n.svg',
		alt: 'scattered clouds',
	},
	'04n': {
		src: '/icons/static/conditions/04n.svg',
		alt: 'broken clouds',
	},
	'09n': {
		src: '/icons/static/conditions/09n.svg',
		alt: 'shoer rain',
	},
	'10n': {
		src: '/icons/static/conditions/10n.svg',
		alt: 'rain',
	},
	'11n': {
		src: '/icons/static/conditions/11n.svg',
		alt: 'thunderstorm',
	},
	'13n': {
		src: '/icons/static/conditions/13n.svg',
		alt: 'snow',
	},
	'50n': {
		src: '/icons/static/conditions/50n.svg',
		alt: 'fog',
	},
};

interface StaticWeatherIconProps
	extends ImgHTMLAttributes<HTMLImageElement>,
		VariantProps<typeof iconVariants> {
	icon: string;
}

const StaticWeatherIcon = ({
	className,
	size,
	variant,
	icon,
	...props
}: StaticWeatherIconProps) => {
	const iconAlt = iconCodes[icon].alt || 'weather icon';
	const iconSrc = iconCodes[icon].src || '';

	return (
		<img
			{...props}
			className={cn(iconVariants({ variant, size }), className)}
			src={iconSrc}
			alt={iconAlt}
		/>
	);
};

export default StaticWeatherIcon;
