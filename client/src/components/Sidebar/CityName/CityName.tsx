import { useAppSelector } from '../../../store/hooks.type';
import { selectLoadingStatus, selectLocation } from '../../../store/slices/weatherSlice';
import Loader from '../../UI/Loader/Loader.js';
import AddCity from './AddCity';
import styles from './CityName.module.scss';

const CityName = () => {
	const isLoaded = useAppSelector(selectLoadingStatus);
	const { name, country, state, time } = useAppSelector(selectLocation);
	const nameString = `${name}, ${state ? state + ', ' : ''} ${country}`;

	const timeString = `local time ${time}`;

	return (
		<div className={styles.city}>
			{isLoaded ? (
				<>
					<h3 className={styles.city__location}>{nameString}</h3>
					<p className={styles.city__local__time}>{timeString}</p>
					<AddCity />
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default CityName;
