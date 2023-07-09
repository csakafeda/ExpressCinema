import React from 'react';
import Home from "./pages/Home";
import {Reservation} from "./pages/Reservation";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {themeOptions} from "./Theme";

function App() {
    const theme = createTheme(themeOptions);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/reservation"} element={<Reservation/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </div>
        </ThemeProvider>
    )
}

export default App;
