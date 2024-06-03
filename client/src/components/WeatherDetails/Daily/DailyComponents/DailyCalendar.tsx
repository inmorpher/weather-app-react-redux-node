import { memo } from 'react';
import { useDailyCalendar } from '../../../../hooks/useDailyCalendar';
import Button from '../../../UI/Button';

const Calendar = memo(() => {
	const { calendar, onCalendarDayClick, selectNextDay, selectPrevDay, dailyState } =
		useDailyCalendar();

	return (
		<>
			<div className='flex justify-center gap-2'>
				{calendar.map((day, index) => {
					return (
						<Button
							key={'daily-calendar' + index}
							variant='calendar'
							size={'small'}
							children={day.days}
							className={dailyState.item === index ? 'active' : ''}
							onClick={() => onCalendarDayClick(index)}
							tabIndex={dailyState.isOpen ? 0 : -1}
							aria-label={day.fullDate}
						/>
					);
				})}
			</div>
			<div className='relative flex items-center justify-center py-3 text-base'>
				<Button
					variant='arrLeft'
					size='small'
					onClick={selectPrevDay}
					className={`absolute left-[10%] ${dailyState.item <= 0 && 'hidden'}`}
					tabIndex={dailyState.isOpen ? 0 : -1}
					aria-label='to previous day'
				/>
				<span>{calendar[dailyState.item].fullDate}</span>
				<Button
					variant='arrRight'
					size='small'
					onClick={selectNextDay}
					className={`absolute right-[10%] ${dailyState.item > 6 && 'hidden'}`}
					tabIndex={dailyState.isOpen ? 0 : -1}
					aria-label='to next day'
				/>
			</div>
		</>
	);
});

export default Calendar;
