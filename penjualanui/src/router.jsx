import {createBrowserRouter} from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Penjualan from './views/penjualan.jsx';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout />,
        children:[
            {
                path: '/penjualan',
                element: <Penjualan />,
            },
        ]
    },
    
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ]
    },
    
]);

export default router;