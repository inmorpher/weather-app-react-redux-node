import styles from './Calendar.module.scss';

type CalendarSelectButtonProps = {
	orientation: 'left' | 'right';
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CalendarSelectButton = ({ orientation, onClick }: CalendarSelectButtonProps) => {
	if (orientation === 'left') {
		return <button className={styles.left} onClick={(event) => onClick(event)} />;
	} else {
		return <button className={styles.right} onClick={(event) => onClick(event)} />;
	}
};

export default CalendarSelectButton;
