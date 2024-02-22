import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.type';
import { selectControls, toggleMetrics, toggleTheme } from '../../../store/slices/userSlice';
import globalStyles from '../../../utils.module.scss';
import styles from './Controls.module.scss';
const Controls = () => {
	const dispatch = useAppDispatch();
	const { theme, units, timeLastUpdate } = useAppSelector(selectControls);

	const onChangeMetricHandler = () => {
		dispatch(toggleMetrics());
	};

	const onThemeChangeHandler = () => {
		dispatch(toggleTheme());
	};

	const onUpdateHandler = () => {
		fetch('/api/weather', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<div className={styles.controls}>
			<p role='button' tabIndex={0} className={styles.controls__update} onClick={onUpdateHandler}>
				updated at {timeLastUpdate}
			</p>
			<div
				className={classNames(
					styles.controls__toggle,
					globalStyles.flex,
					globalStyles.flex__center
				)}
			>
				<div
					role='button'
					tabIndex={0}
					className={classNames(
						styles.controls__toggle__metric,
						styles.controls__toggle__wrapper,
						globalStyles.flex,
						globalStyles.flex__around,
						globalStyles.rounded,
						units === 'metric' ? styles.metric : styles.imperial
					)}
					onClick={onChangeMetricHandler}
				>
					<img
						src='/icons/static/cels.svg'
						alt=''
						className={classNames(
							styles.controls__toggle__icon,
							units === 'metric' ? styles.selected : ''
						)}
					/>
					<img
						src='/icons/static/farenh.svg'
						alt=''
						className={classNames(
							styles.controls__toggle__icon,
							units === 'imperial' ? styles.selected : ''
						)}
					/>
				</div>
				<div
					role='button'
					tabIndex={0}
					className={classNames(
						styles.controls__toggle__theme,
						styles.controls__toggle__wrapper,
						globalStyles.flex,
						globalStyles.flex__around,
						globalStyles.rounded
					)}
					onClick={onThemeChangeHandler}
				>
					<img
						className={classNames(
							styles.controls__toggle__icon,
							theme === 'light' ? styles.selected : ''
						)}
						src='/icons/static/t_light.svg'
					/>
					<img
						className={classNames(
							styles.controls__toggle__icon,
							theme === 'dark' ? styles.selected : ''
						)}
						src='/icons/static/t_dark.svg'
					/>
				</div>
			</div>
		</div>
	);
};

export default Controls;
