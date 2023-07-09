    import {AppBar, Toolbar, Typography} from "@mui/material";
    import React from "react";

    export const Navbar: React.FC = () => {

        return (
            <AppBar position="static" color="primary">
                <Toolbar style={{}}>
                    <Typography variant="h6" component="div">
                        <a href={"/"}>Express Cinema</a>
                    </Typography>
                    <Typography variant="h6" component="div">
                        <a href="/src/pages/Reservation">
                            Reserve
                        </a>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    };
