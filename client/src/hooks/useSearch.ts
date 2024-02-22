import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks.type';
import { fetchWeather } from '../store/slices/weatherSlice';

export const useSearch = () => {
	const searchRef = useRef<HTMLInputElement | null>(null);
	const [isInputEmpty, setIsInputEmpty] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSearchSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isInputEmpty || !searchRef.current?.value) return;

		const [city, country = ''] = searchRef.current.value.split(',');
		const addressString = `/${city.trim()}/${country.trim()}`;
		dispatch(fetchWeather());
		navigate(addressString);
		searchRef.current.value = '';
		setIsInputEmpty(true);
	};

	const onSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
		setIsInputEmpty(!event.target.value);
	};

	return {
		searchRef,
		onSearchInput,
		onSearchSubmitHandler,
		isInputEmpty,
	};
};
