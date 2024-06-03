import { memo, useRef } from 'react';
import { useDaily } from '../../../hooks/useDaily';
import Button from '../../UI/Button';
import Calendar from './DailyComponents/DailyCalendar';
import WeatherCondition from './DailyComponents/DailyWeatherCondition';
import WeatherDetails from './DailyComponents/DailyWeatherDetails';
import WeatherScale from './DailyComponents/WeatherScale/WeatherScale';

const CalendarMemo = memo(Calendar);
export const DailyDetails: React.FC = () => {
	const { onCloseDetails, dailyState } = useDaily();

	const popupRef = useRef<HTMLDivElement>(null);

	return (
		<div className=' relative inline-block w-full px-1' ref={popupRef}>
			<Button
				variant='close'
				className='sticky left-[100%] top-0'
				onClick={() => onCloseDetails()}
				tabIndex={dailyState.isOpen ? 0 : -1}
				aria-label='close details'
			/>
			<div className='mt-[-40px] h-full w-full'>
				<CalendarMemo />
				<WeatherCondition />
				<WeatherScale />
				<WeatherDetails />
			</div>
		</div>
	);
};

export default DailyDetails;
