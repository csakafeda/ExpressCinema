import {Typography} from "@mui/material";
import React from "react";

export const Footer: React.FC = () => {
    return (
        <footer style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            marginTop: '2rem',
            backgroundColor: '#f5f5f5',
            padding: '1rem'
        }}>
            <Typography variant="body2" component="p">
                Email: expresscinema@gmail.com
            </Typography>
            <Typography variant="body2" component="p">
                Phone: +1 123 456 7890
            </Typography>
            <Typography variant="body2" component="p">
                Address: 1071 Budapest, Fő street 2.
            </Typography>
        </footer>
    )
}
