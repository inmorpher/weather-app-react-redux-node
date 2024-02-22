import classNames from 'classnames';
import { ReactNode } from 'react';
import globalStyles from '../../../utils.module.scss';
import styles from './Layout.module.scss';
type myProp = {
	children: ReactNode;
};
const Layout: React.FC<myProp> = ({ children }) => {
	console.log('layout');
	return <div className={classNames(styles['main-layout'], globalStyles.flex)}>{children}</div>;
};

export default Layout;
