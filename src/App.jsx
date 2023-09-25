import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import TasksScreen from "./screens/tasks/TasksScreen";
import NotFound from "./screens/NotFound";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "Poppins, Arial, Verdana",
    },
    palette: {
        mode: "dark",
    },
});

function App() {
    // Record the height value
    const [style, setStyle] = useState({});

    /**
     * When the screen size changes, update the height of the App
     * This is done because mobile devices LIE about their height and need to be calculated in JS
     */
    useEffect(() => {
        // Update the style
        const handleWindowSizeChange = () => {
            setStyle({ height: window.innerHeight });
        };

        // Set an event listener to adjust the height when the window is resized
        window.addEventListener("resize", handleWindowSizeChange);

        // Update the height on first load
        handleWindowSizeChange();

        // On unmount, remove the listener
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="App" style={style}>
                        <BrowserRouter>
                            <Routes>
                                {/* Public Routes */}
                                <Route
                                    path="/tasks"
                                    element={<TasksScreen />}
                                />
                                <Route path="/404" element={<NotFound />} />

                                {/* Redirects */}
                                <Route
                                    path="/"
                                    element={<Navigate to="/tasks" replace />}
                                />
                                <Route
                                    path="*"
                                    element={<Navigate to="/404" replace />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </LocalizationProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
