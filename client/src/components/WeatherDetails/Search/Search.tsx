import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useSearch } from '../../../hooks/useSearch';
import globalStyles from '../../../utils.module.scss';
import styles from './Search.module.scss';

const Search = () => {
	const param = useParams();
	const { searchRef, onSearchInput, onSearchSubmitHandler, isInputEmpty } = useSearch();

	return (
		<section className={styles.search}>
			<form
				className={classNames(styles.search__form, Object.keys(param).length === 0 && styles.full)}
				onSubmit={onSearchSubmitHandler}
			>
				<input type='button' className={styles.search__form__geo} />
				<input
					type='search'
					name='city'
					autoComplete='on'
					autoFocus
					className={classNames(
						globalStyles.rounded,
						globalStyles.shadow,
						styles.search__form__searchfield
					)}
					placeholder='type yor city'
					ref={searchRef}
					onChange={onSearchInput}
				/>
				<input
					type='submit'
					value=''
					disabled={isInputEmpty}
					className={styles.search__form__submit}
				/>
			</form>
		</section>
	);
};

export default Search;
