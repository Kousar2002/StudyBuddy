import React from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AuthForm from '../components/AuthForm';
import bgImage from '../assets/background.jpg';
const GradientBackground = styled(Box)({
  position: 'relative',
  minHeight: '96vh',
  backgroundImage: `url(${bgImage})`, // imported image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 14, 14, 0.7)', // white translucent overlay
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
});

const LandingPage = () => {
  return (
    <GradientBackground>
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={20} alignItems="flex-start">
          <Grid item xs={12} md={7}>
            <Chip
              label="Now Available"
              color="primary"
              sx={{ fontWeight: 600, mb: 2 }}
            />
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
             Level Up Your Learning, Together
            </Typography>
            <Typography variant="h6" color="#1a1a1a" sx={{ mb: 4, maxWidth: 500 }}>
           Join a vibrant community where ideas spark and skills grow.
Learn side by side, share your journey, and unlock new possibilities.
Together, we turn curiosity into mastery—because better learning happens as one.
            </Typography>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'sticky', top: 96 }}>
              <AuthForm />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </GradientBackground>
  );
};

export default LandingPage;
