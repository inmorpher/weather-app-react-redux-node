import classNames from 'classnames';
import { useAppSelector } from '../../../store/hooks.type';
import { getUserCityListMemo } from '../../../store/slices/userSlice';

import globalStyles from '../../../utils.module.scss';
import styles from './UserCityList.module.scss';
import UserCityListItem from './UserCityListItem';

const UserCityList = () => {
	const userList = useAppSelector(getUserCityListMemo);

	return (
		<div
			className={classNames(
				styles.user__city,
				globalStyles.flex,
				globalStyles.flex__center,
				globalStyles.flex__align__center
			)}
		>
			{userList && userList.length == 0 && 'list is empty'}
			{userList && userList.length > 0 && (
				<ul
					className={classNames(styles.user__city__list, globalStyles.shadow, globalStyles.rounded)}
				>
					{userList.map((item, index) => {
						return (
							<UserCityListItem key={'userList' + index} city={item.city} country={item.country} />
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default UserCityList;
