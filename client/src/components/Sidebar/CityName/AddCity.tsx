import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks.type';
import { addCity } from '../../../store/slices/userSlice';
import styles from './CityName.module.scss';

const AddCity = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [city, country] = location.pathname.split('/').filter((url) => url !== '');

	const onAddCityHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		dispatch(addCity({ city, country }));
	};
	return (
		<span className={styles.city__add} tabIndex={0} role='button' onClick={onAddCityHandler}>
			add to list
		</span>
	);
};

export default AddCity;
