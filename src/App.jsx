import {GlobalStyle} from "./styles/global";

import AppRoutes from "./AppRoutes.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {TaskProvider} from "./context/TasksContext.jsx";
import {ThemeModeProvider} from "./context/ThemeModeContext.jsx";

export default function App() {
    return (
        <ThemeModeProvider>
            <GlobalStyle/>
            <AuthProvider>
                <TaskProvider>
                    <AppRoutes/>
                </TaskProvider>
            </AuthProvider>
        </ThemeModeProvider>
    );
}
