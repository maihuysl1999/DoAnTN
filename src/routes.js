import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import NotFound from "./pages/Page404";
import Register from "./pages/Register";
import Products from "./pages/Products";
// network
import DashboardApp from "./pages/network/DashboardApp";
import DetailNetwork from "./pages/network/DetailNetwork";
import NewNetwork from "./pages/network/NewNetwork";
//dapp
import ListDapp from "./pages/dapp/ListDapp";
import DetailDapp from "./pages/dapp/DetailDapp";
//
import { getRole, ROLE } from "src/utils/role";
// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: "/networks",
            element: <DashboardLayout />,
            children: [
                { path: "", element: <DashboardApp /> },
                { path: "new", element: <NewNetwork /> },
                { path: ":networkId", element: <DetailNetwork /> },
                { path: "dapp", element: <ListDapp /> },
                { path: "products", element: <Products /> },
                { path: "blog", element: <Blog /> },
                { path: "*", element: <Navigate to="/networks" replace={true} /> },
            ],
        },
        {
            path: "/dapps",
            element: <DashboardLayout />,
            children: [
                { path: "", element: <ListDapp /> },
                // { path: "new", element: <NewDApp /> },
                { path: ":dappId", element: <DetailDapp /> },
                // { path: "edit/:dappId", element: <EditDApp /> },
                { path: "*", element: <Navigate to="/dapps" replace={true} /> },
                // { path: "404", element: <NotFound /> },
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
        to = "/networks";
    }
    return <Navigate to={to} />;
}
