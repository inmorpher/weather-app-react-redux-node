import { useDaily } from '../../../../hooks/useDaily';
import { useAppSelector } from '../../../../store/hooks.type';
import { selectPopupMainWeather } from '../../../../store/slices/weatherSlice';
import StaticWeatherIcon from '../../../UI/StaticWeatherIcon';

function WeatherCondition() {
	const { dailyState } = useDaily();
	const { max, min, icon, condition } = useAppSelector(selectPopupMainWeather(dailyState.item));
	return (
		<div className='w- flex justify-around'>
			<div className='flex items-center'>
				<StaticWeatherIcon icon={icon} className='mr-2' size='medium' />
				<span className='text-base font-thin leading-4'>{condition}</span>
			</div>
			<div className='flex gap-2'>
				<span className='relative before:absolute before:left-[-5px] before:h-full before:w-1 before:bg-up-arrow-btn  before:bg-center before:bg-no-repeat'>
					{max.value}
					{max.units}
				</span>
				<span className='relative before:absolute before:left-[-5px] before:h-full before:w-1 before:bg-down-arrow-btn before:bg-center before:bg-no-repeat'>
					{min.value}
					{min.units}
				</span>
			</div>
		</div>
	);
}

export default WeatherCondition;
