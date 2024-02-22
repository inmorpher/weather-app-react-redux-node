import classNames from 'classnames';
import { memo } from 'react';
import { useAppSelector } from '../../../../store/hooks.type';
import { selectPopupCalendar } from '../../../../store/slices/weatherSlice';
import globalStyles from '../../../../utils.module.scss';
import { usePopupContext } from '../popup.context.utils';
import styles from './Calendar.module.scss';
import CalendarSelectButton from './CalendarSelectButton';

const Calendar = memo(({ currentDay }: { currentDay: number }) => {
	console.log('render CAlendar');
	const { popupState, openPopup } = usePopupContext();

	const calendar = useAppSelector(selectPopupCalendar);

	const onCalendarDayClick = (index: number) => {
		openPopup(index, popupState.position);
	};

	const selectPrevDay = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (popupState.item > 0) {
			openPopup(popupState.item - 1, popupState.position);
			return;
		}

		console.log('There no more days BEFORE');
	};

	const selectNextDay = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (popupState.item < 7) {
			openPopup(popupState.item + 1, popupState.position);
			return;
		}

		console.log('There are no more days NEXT');
	};
	return (
		<>
			<div
				className={classNames(
					styles.calendar,
					globalStyles.flex,
					globalStyles.flex__align__center,
					globalStyles.flex__between
				)}
			>
				{calendar.map((day, index) => {
					const active = currentDay === index ? styles.active : '';
					return (
						<button
							key={'calendarDaysList' + day.days}
							className={classNames(styles.calendar__days, active)}
							onClick={() => onCalendarDayClick(index)}
						>
							<span>{day.days}</span>
						</button>
					);
				})}
			</div>
			<div
				className={classNames(
					styles.calendar__full__date,
					globalStyles.flex,
					globalStyles.flex__center,
					globalStyles.flex__align__center
				)}
			>
				{currentDay > 0 && (
					<CalendarSelectButton orientation='left' onClick={(event) => selectPrevDay(event)} />
				)}
				<span>{calendar[currentDay].fullDate}</span>
				{currentDay < 7 && (
					<CalendarSelectButton orientation='right' onClick={(event) => selectNextDay(event)} />
				)}
			</div>
		</>
	);
});

export default Calendar;
