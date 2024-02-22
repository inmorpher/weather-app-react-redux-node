import classNames from 'classnames';
import { useAnimateAppearance } from '../../../hooks/useAnimateAppearance';
import globalStyles from '../../../utils.module.scss';
import styles from './Skeleton.module.sass';

const Skeleton = () => {
	const isVisible = useAnimateAppearance();

	return (
		<div
			className={classNames(
				styles.skeleton,
				globalStyles.flex,
				globalStyles.flex__column,
				isVisible ? globalStyles.v : globalStyles.u
			)}
		>
			<div
				className={classNames(styles.wrapper, globalStyles.flex, globalStyles.flex__align__center)}
			>
				<div className={classNames(styles.round, styles.shimmering)} />
				<div className={classNames(styles.text, globalStyles.rounded, styles.shimmering)} />
			</div>
			<div className={classNames(styles.description, styles.shimmering, globalStyles.rounded)} />
		</div>
	);
};

export default Skeleton;
