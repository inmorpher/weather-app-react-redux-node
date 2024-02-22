import classNames from 'classnames';
import React, { ReactNode } from 'react';
import globalStyle from '../../../utils.module.scss';
import styles from './Card.module.scss';
type CardProps = {
	children?: ReactNode | null;
	title: string;
	style: string;
};

const Card: React.FC<CardProps> = ({ children = null, title, style }) => {
	return (
		<div
			className={classNames(
				style,
				styles.card,
				globalStyle.flex,
				globalStyle.flex__column,
				globalStyle.rounded,
				globalStyle.shadow
			)}
		>
			<h4 className={styles.card__title}>{title}</h4>

			{children && children}
		</div>
	);
};

export default Card;
