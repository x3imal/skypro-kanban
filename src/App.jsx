import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./styles/global";
import {theme} from "./styles/theme";

import AppRoutes from "./AppRoutes.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
                <AuthProvider>
                    <AppRoutes/>
                </AuthProvider>
        </ThemeProvider>
    );
}
