import { useCallback, useEffect, useRef } from 'react';
import { usePopupContext } from '../components/UI/Popup/popup.context.utils';
import { useAppSelector } from '../store/hooks.type';
import { selectDaily } from '../store/slices/weatherSlice';

export const useDailyPopup = () => {
	const { dailyValues, colors } = useAppSelector(selectDaily);
	const { openPopup, popupState } = usePopupContext();
	const listItemsRefs = useRef<Array<HTMLLIElement | null>>(
		Array.from({ length: dailyValues.length }, () => null)
	);
	const listContainerRef = useRef<HTMLUListElement | null>(null);
	const windowWidth = useRef<number>(window.innerWidth);

	const onOpenPopup = useCallback(
		(index: number) => {
			const itemRef = listItemsRefs.current[index];
			if (!itemRef || !listContainerRef.current) return;

			const container = listContainerRef.current.getBoundingClientRect();
			const gap = 20;
			const popupHeight = container.height * 1.5;
			const popupWidth = container.width;

			const pY = container.height - popupHeight;

			const rightSpace = windowWidth.current > container.right + gap + popupWidth ? true : false;

			const pX = rightSpace ? gap + popupWidth : -gap - popupWidth;

			if (windowWidth.current < 750) {
				openPopup(index);
			} else {
				openPopup(index, {
					x: `${pX}px`,
					y: `${pY}px`,
					width: `${container.width}px`,
					height: `${popupHeight}px`,
				});
			}
		},
		[openPopup]
	);

	useEffect(() => {
		const handleResize = () => {
			windowWidth.current = window.innerWidth;
			if (popupState.isOpen) {
				onOpenPopup(popupState.item);
			}
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [popupState.item, onOpenPopup, popupState.isOpen]);

	return { dailyValues, colors, listItemsRefs, listContainerRef, onOpenPopup };
};
