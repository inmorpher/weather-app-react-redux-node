import { Link, useMatch } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks.type';
import { IWeatherList, deleteCity } from '../../../store/slices/userSlice';
import globalStyle from '../../../utils.module.scss';
import styles from './UserCityList.module.scss';

import classNames from 'classnames';

const UserCityListItem = ({ city, country }: IWeatherList) => {
	const dispatch = useAppDispatch();
	const match = useMatch(`/${city}/${country}`);

	const onDeleteCityHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		dispatch(deleteCity({ city, country }));
	};
	return (
		<li
			className={classNames(
				globalStyle.flex,
				globalStyle.flex__between,
				globalStyle.flex__align__center,
				match !== null ? styles.active : ''
			)}
		>
			<img src='/icons/static/conditions/10n.svg' />
			<Link to={`/${city}/${country}`}>
				{city}, {country}
			</Link>
			<p>10</p>
			<button onClick={onDeleteCityHandler}>
				<img src='/icons/static/trash.svg' />
			</button>
		</li>
	);
};

export default UserCityListItem;
