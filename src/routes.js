import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Blog from "./pages/Blog";
import User from "./pages/User";
import Login from "./pages/Login";
import NotFound from "./pages/Page404";
import Register from "./pages/Register";
import Products from "./pages/Products";
import DashboardApp from "./pages/network/DashboardApp";
//
import { getRole, ROLE } from "src/utils/role";
// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { path: "network", element: <DashboardApp /> },
                { path: "user", element: <User /> },
                { path: "products", element: <Products /> },
                { path: "blog", element: <Blog /> },
            ],
        },
        {
            path: "/",
            element: <LogoOnlyLayout />,
            children: [
                // { path: "/", element: <Login /> },
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> },
                { path: "404", element: <NotFound /> },
                // { path: "*", element: <Navigate to="/404" /> },
                { path: "*", element: <Redirector /> },
                // { path: "404", element: <NotFound /> },
                { path: "/", element: <Redirector /> },
            ],
        },
        { path: "*", element: <Navigate to="/404" replace /> },
    ]);
}

function Redirector(props) {
    const role = getRole();
    let to = "";
    if (!role) {
        to = "/login";
    } else if (role === ROLE.USER) {
        to = "/dashboard/network";
    }
    return <Navigate to={to} />;
}
