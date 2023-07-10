import {Box, Typography} from "@mui/material";
import React from "react";
import facebookIcon from "../assets/socials/facebook.png";
import instagramIcon from "../assets/socials/instagram.png";

export const Footer: React.FC = () => {
    return (
        <footer
            style={{
                left: 0,
                bottom: 0,
                position: "fixed",
                width: "100%",
                height: "15vh",
                backgroundColor: "#2B6BB2",
                padding: "1rem",
                color: "white",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                zIndex: "1000"
            }}
        >
            <Box>
                <Typography variant="h6">Contacts:</Typography>
                <Typography variant="body2" component="p">
                    Email: expresscinema@gmail.com
                </Typography>
                <Typography variant="body2" component="p">
                    Phone: +1 123 456 7890
                </Typography>
                <Typography variant="body2" component="p">
                    Address: 1071 Budapest, Fő street 2.
                </Typography>
            </Box>
            <Box style={{margin: "10px"}}>
                <Typography variant="h6">Follow us</Typography>
                <a
                    href="https://www.facebook.com/bardiauto"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        textDecoration: "none",
                        margin: "0.2vw",
                    }}
                >
                    <img
                        src={facebookIcon}
                        alt="Facebook"
                        style={{width: "2rem", height: "2rem", marginRight: "0.5rem"}}
                    />
                    Facebook
                </a>
                <a
                    href="https://www.instagram.com/bardiauto/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        textDecoration: "none",
                        margin: "0.2vw",
                    }}
                >
                    <img
                        src={instagramIcon}
                        alt="Instagram"
                        style={{width: "2rem", height: "2rem", marginRight: "0.5rem"}}
                    />
                    Instagram
                </a>
            </Box>
        </footer>
    );
};
