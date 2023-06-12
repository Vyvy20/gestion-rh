import { Navigate } from 'react-router-dom';
import Interface from './page/Interface';
import Home from './page/Home';
import RhHome from './page/RhHome';

const MAP_ROUTES = [
  { path: '/', element: <Navigate to="/app" /> },
  {
    path: '/app',
    element: <Interface />,
    children: [
      { index: true, element: <Navigate to="/app/home" /> },
      { path: 'home', element: <Home /> },
      { path: 'rhHome', element: <RhHome /> },
    ],
  },
];

export default MAP_ROUTES;
