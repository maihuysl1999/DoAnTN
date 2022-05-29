// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import { Provider } from "react-redux";
import store from "src/store/index";
//
// import "./index.scss";

// ----------------------------------------------------------------------

export default function App() {
    return (
        <ThemeProvider>
            <ScrollToTop />
            <BaseOptionChartStyle />
            <Provider store={store}>
                <Router />
            </Provider>
        </ThemeProvider>
    );
}
