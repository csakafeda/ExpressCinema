import React from 'react';
import {Container, Paper, Typography} from '@mui/material';

const Home: React.FC = () => {
    return (
        <div>
            <Container sx={{marginTop: '10rem'}}>
                <Paper elevation={3} sx={{padding: '2rem'}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome to Express Cinema
                    </Typography>
                    <Typography variant="body1" component="p" paragraph>
                        Express Cinema is an outdoor cinema where you can enjoy both the classics and the newest movies with your friends and family.
                    </Typography>
                    <Typography variant="body1" component="p" paragraph>
                        Reserve your seats now for tomorrow's movie
                        <a href={"/reservation"}> HERE </a> and have a memorable cinema experience under the stars.
                    </Typography>
                </Paper>
            </Container>

        </div>
    );
};

export default Home;
