import { Suspense, lazy, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import { PopupProvider } from './components/UI/Popup/popup.context';
import Layout from './components/UI/layout/Layout';
import Search from './components/WeatherDetails/Search/Search';
import { useAppDispatch } from './store/hooks.type';
import { fetchUserList } from './store/slices/userSlice';
const AsyncWeatherDetails = lazy(() => import('./components/WeatherDetails/WeatherDetails'));

const router = createBrowserRouter([
	{
		path: '/:city/:country',
		element: (
			<>
				<Sidebar />
				<AsyncWeatherDetails />
			</>
		),
	},
	{
		path: '/',
		element: <Search />,
		errorElement: <div>Error</div>,
	},
]);

const App: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUserList());
	}, [dispatch]);
	return (
		<Layout>
			<Suspense fallback={<div>...loading</div>}>
				<PopupProvider>
					<RouterProvider router={router} />
				</PopupProvider>
			</Suspense>
		</Layout>
	);
};

export default App;
