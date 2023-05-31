import { Navigate } from "react-router-dom";
import Interface from "./page/Interface";
import Home from "./page/Home";

const MAP_ROUTES = [
    { path: "/", element: <Navigate to="/app" /> },
    { path: "/app", element: <Interface />, children: [
        { index: true, element: <Navigate to="/app/home" /> },
        { path: "home", element: <Home /> }
    ]}
];

export default MAP_ROUTES
