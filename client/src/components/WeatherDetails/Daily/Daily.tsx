import { useDaily } from '../../../hooks/useDaily';
import StaticWeatherIcon from '../../UI/StaticWeatherIcon';
import DailyColors from './DailyColors';
import DailyDetails from './DailyDetails';

const Daily = () => {
	const {
		dailyValues,
		colors,
		onOpenPopup,
		onPressKeys,
		containerRef,
		dailyDetailsRef,
		dailyListRef,
		dailyState,
	} = useDaily();

	return (
		<div
			className='flex h-full w-full overflow-hidden whitespace-nowrap rounded-b-lg bg-primary-color-500 dark:bg-primary-color-dark-500'
			ref={containerRef}
		>
			<DailyColors colors={colors} />
			<div className='relative inline-block h-full min-w-full' ref={dailyListRef}>
				<ul className='m-auto flex h-full flex-col justify-between overflow-hidden rounded-b-lg'>
					{dailyValues.map((daily, index) => (
						<li
							key={'day' + index}
							className='flex w-full cursor-pointer border-b-transparent px-3 py-2 outline-0 transition-all duration-300 ease-in-out focus:outline-0 hocus:bg-primary-color-900 hocus:dark:bg-primary-color-dark-900 '
							onClick={() => onOpenPopup(index)}
							onKeyDown={(event) => {
								onPressKeys(event, index);
							}}
							tabIndex={dailyState.isOpen ? -1 : 0}
						>
							<div className='flex w-1/5 justify-start'>
								<span className={`${index ? 'font-light' : 'font-bold'}`}>
									{index ? daily.day : 'Today'}
								</span>
							</div>
							<div className='flex w-3/5 items-center '>
								<span className='w-1/5'>
									{daily.dailyMin.value}
									{daily.dailyMin.units}
								</span>
								<svg
									width='135'
									height='7'
									viewBox='0 0 135 8'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className='w-4/5'
								>
									<line
										x1='0'
										y1='4'
										x2='135'
										y2='4'
										stroke='#ADADAD'
										strokeWidth='2'
										strokeLinecap='round'
									/>
									<line
										x1={daily.coords[index].x1}
										y1='4'
										x2={daily.coords[index].x2}
										y2='4'
										stroke='url(#temp-color-scale)'
										strokeWidth='6'
										strokeLinecap='round'
									/>
								</svg>
								<span className='w-1/6'>
									{daily.dailyMax.value}
									{daily.dailyMax.units}
								</span>
							</div>
							<div className='flex w-1/5 justify-end'>
								<StaticWeatherIcon variant={'default'} icon={daily.icon} />
							</div>
						</li>
					))}
				</ul>
			</div>
			<div
				className='inline-block  min-w-full overflow-hidden overflow-y-scroll scrollbar-hidden scrollbar-hidden-webkit'
				ref={dailyDetailsRef}
			>
				<DailyDetails />
			</div>
		</div>
	);
};

export default Daily;
