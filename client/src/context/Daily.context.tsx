import React, {
	ReactNode,
	createContext,
	startTransition,
	useCallback,
	useRef,
	useState,
} from 'react';
import { useWindowResize } from '../hooks/useWindowResize';

export type DailyContextProps = {
	children: ReactNode;
};

export type ListItem = number;

export type DailyState = {
	isOpen: boolean;
	item: number;
};

export type DailyContextType = {
	dailyState: DailyState;
	isActiveListener: boolean;
	containerRef: React.RefObject<HTMLDivElement>;
	dailyListRef: React.RefObject<HTMLDivElement>;
	dailyDetailsRef: React.RefObject<HTMLDivElement>;
	hideDetails: () => void;
	showDetails: (item: number) => void;
	setIsActiveListener: (value: boolean) => void;
};

export const DailyContext = createContext<DailyContextType | undefined>(undefined);

export const DailyProvider: React.FC<DailyContextProps> = ({ children }) => {
	const [dailyState, setDailyState] = useState<DailyState>({
		isOpen: false,
		item: 0,
	});

	const [isActiveListener, setIsActiveListener] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const dailyListRef = useRef<HTMLDivElement>(null);
	const dailyDetailsRef = useRef<HTMLDivElement>(null);
	/**
	 * Opens the popup with the given item and position.
	 * @param item the index of the item to display in the popup
	 * @param position the position of the popup, or 'mobile' to use the mobile layout
	 */

	const showDetails = useCallback((item: number) => {
		startTransition(() => {
			setDailyState({
				isOpen: true,
				item,
			});
		});
	}, []);

	const hideDetails = useCallback(() => {
		startTransition(() => {
			setDailyState((prevState) => ({
				...prevState,
				isOpen: false,
			}));
		});
	}, []);

	const scrollToggler = useCallback(() => {
		if (containerRef.current && dailyListRef.current && dailyDetailsRef.current) {
			const containerLeft = containerRef.current.offsetLeft;
			const dailyDetailsLeft = dailyDetailsRef.current.offsetLeft;
			containerRef.current.scrollTo({
				left: dailyDetailsLeft - containerLeft,
				behavior: 'smooth',
			});
		}
	}, [containerRef, dailyDetailsRef, dailyListRef]);

	useWindowResize(() => {
		if (dailyState.isOpen) {
			scrollToggler();
		}
	}, dailyState.isOpen);

	return (
		<DailyContext.Provider
			value={{
				dailyState,
				showDetails,
				hideDetails,
				containerRef,
				dailyDetailsRef,
				dailyListRef,
				isActiveListener,
				setIsActiveListener,
			}}
		>
			{children}
		</DailyContext.Provider>
	);
};
