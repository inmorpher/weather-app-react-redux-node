import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import globalStyles from '../../utils.module.scss';
import CityName from './CityName/CityName';
import Controls from './Controls/Controls';
import MainWeather from './MainWeather/MainWeather';
import styles from './Sidebar.module.scss';
import UserCityList from './UserCityList/UserCityList';

const Sidebar = () => {
	const location = useLocation();
	console.log('sidebar');
	return (
		<aside
			className={classNames(
				styles.sidebar,
				globalStyles.grid,
				globalStyles.shadow,
				location.pathname !== '/' && styles.active
			)}
		>
			<CityName />
			<MainWeather />
			<UserCityList />
			<Controls />
		</aside>
	);
};

export default Sidebar;
