import React, { ReactNode, createContext, startTransition, useCallback, useState } from 'react';

export type PopupContextProps = {
	children: ReactNode;
};

export type ListItem = number;
export type PopupPosition = {
	x: number | string | null;
	y: number | string | null;
	width: number | string | null;
	height: number | string | null;
};

export type PopupPositionAndMobile = PopupPosition | 'mobile';

export type PopupState = {
	isOpen: boolean;
	item: number;
	position?: PopupPosition;
};

export type PopupContextType = {
	popupState: PopupState;
	openPopup: (item: number, position?: PopupPosition) => void;
	closePopup: () => void;
};

export const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<PopupContextProps> = ({ children }) => {
	const [popupState, setPopupState] = useState<PopupState>({
		isOpen: false,
		item: 0,
		position: { x: null, y: null, width: null, height: null },
	});
	/**
	 * Opens the popup with the given item and position.
	 * @param item the index of the item to display in the popup
	 * @param position the position of the popup, or 'mobile' to use the mobile layout
	 */

	const openPopup = useCallback((item: number, position?: PopupPosition) => {
		startTransition(() => {
			document.body.style.overflow = 'hidden';
			const popupState = position
				? {
						x: `${position.x}`,
						y: `${position.y}`,
						width: `${position.width}`,
						height: `${position.height}`,
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }
				: undefined;

			setPopupState({
				isOpen: true,
				item,
				position: popupState,
			});
		});
	}, []);

	const closePopup = useCallback(() => {
		startTransition(() => {
			document.body.style.overflow = '';
			setPopupState((prevState) => ({
				...prevState,
				isOpen: false,
			}));
		});
	}, []);

	return (
		<PopupContext.Provider value={{ popupState, openPopup, closePopup }}>
			{children}
		</PopupContext.Provider>
	);
};
