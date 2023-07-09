import { Box, Typography } from "@mui/material";
import React from "react";
import facebookIcon from "../assets/socials/facebook.png";
import instagramIcon from "../assets/socials/instagram.png";

export const Footer: React.FC = () => {
    return (
        <footer
            style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                width: "100%",
                marginTop: "2rem",
                backgroundColor: "#2B6BB2",
                padding: "1rem",
                color: "white",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center"
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
            <Box>
                <Typography variant="h6">Follow us</Typography>
                <a
                    href="https://www.facebook.com/studycafe"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", color: "white", textDecoration: "none" }}
                >
                    <img
                        src={facebookIcon}
                        alt="Facebook"
                        style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }}
                    />
                    Facebook
                </a>
                <a
                    href="https://www.instagram.com/thegardenstudioandcafe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", color: "white", textDecoration: "none" }}
                >
                    <img
                        src={instagramIcon}
                        alt="Instagram"
                        style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }}
                    />
                    Instagram
                </a>
            </Box>
        </footer>
    );
};
