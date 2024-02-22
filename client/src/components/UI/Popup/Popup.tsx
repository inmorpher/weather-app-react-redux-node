import classNames from 'classnames';
import { CSSProperties, memo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import globalStyle from '../../../utils.module.scss';
import Calendar from './Calendar/Calendar';
import WeatherDetails from './Details/WeatherDetails';
import style from './Popup.module.scss';
import WeatherCondition from './Weather/Weather.condition';
import WeatherScale from './WeatherScale/WeatherScale';
import { usePopupContext } from './popup.context.utils';

const CalendarMemo = memo(Calendar);
export const Popup: React.FC = () => {
	const { closePopup, popupState: state } = usePopupContext();
	const popupRef = useRef<HTMLDivElement>(null);
	const navigate = useLocation();

	const popupStyles = state.position
		? ({
				left: state.position.x,
				top: state.position.y,
				width: state.position.width,
				height: state.position.height,
		  } as CSSProperties)
		: undefined;
	useEffect(() => {
		closePopup();
	}, [navigate.pathname, closePopup]);

	return (
		<CSSTransition
			in={state.isOpen}
			timeout={300}
			classNames={{
				enter: style.fade_enter,
				enterActive: style.fade_enter_active,
				exit: style.fade_exit,
				exitActive: style.fade_exit_active,
			}}
			nodeRef={popupRef}
			unmountOnExit
		>
			<div
				className={classNames(style.popup, globalStyle.rounded, globalStyle.shadow)}
				style={popupStyles}
				ref={popupRef}
			>
				<button className={style.popup__close__btn} onClick={closePopup} />
				{state.isOpen && (
					<div className={style.wrapper} style={{ maxHeight: `${state.position}` }}>
						<CalendarMemo currentDay={state.item} />
						<WeatherCondition day={state.item} />
						<WeatherScale dayNumber={state.item} />
						<WeatherDetails day={state.item} />
					</div>
				)}
			</div>
		</CSSTransition>
	);
};

export default Popup;
