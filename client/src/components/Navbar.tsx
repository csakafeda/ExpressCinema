import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";

export const Navbar: React.FC = () => {

    return (
        <AppBar position="static" style={{backgroundColor: "#2B6BB2"}}>
            <Toolbar style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
                <Typography variant="h6" component="div" style={{}}>
                    <a href="/" style={{textDecoration: "none", color: "white"}}>
                        Express Cinema
                    </a>
                </Typography>
                <Typography variant="h6" component="div" style={{color: "white"}}>
                    <a href="/reservation" style={{textDecoration: "none", color: "white"}}>
                        Reserve
                    </a>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
