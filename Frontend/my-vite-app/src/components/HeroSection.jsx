// import React from 'react';
// import { Box, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import logo from '../assets/logo.png';

// const StyledImage = styled('img')({
//   width: '100%',
//   maxWidth: '500px',
//   borderRadius: '16px',
//   boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//   transition: 'transform 0.3s ease',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// const StatCard = styled(Card)({
//   position: 'absolute',
//   bottom: '-16px',
//   right: '-16px',
//   backgroundColor: '#1976d2',
//   color: 'white',
//   padding: '16px',
//   borderRadius: '12px',
//   boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
// });

// const GradientButton = styled(Button)({
//   background: 'linear-gradient(to right, #1976d2, #9c27b0)',
//   color: 'white',
//   padding: '12px 32px',
//   fontSize: '18px',
//   fontWeight: 'bold',
//   textTransform: 'none',
//   borderRadius: '8px',
//   '&:hover': {
//     background: 'linear-gradient(to right, #1565c0, #7b1fa2)',
//     transform: 'scale(1.05)',
//   },
// });

// const HeroSection = () => {
//   return (
//     <div>
//        <img src={logo} alt="Professional workspace" style={{ width: '100%', maxWidth: 500, borderRadius: 16 }} />
//     </div>
//     // <Box sx={{ height: '100%', py: 4 }}>
//     //   <Grid container spacing={6} alignItems="center" sx={{ height: '100%' }}>
//     //     {/* Image Section */}
//     //     <Grid item xs={12} lg={6}>
//     //       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//     //         <Box sx={{ position: 'relative' }}>
//     //           {/* <StyledImage
//     //             src={logo}
//     //             alt="Professional workspace"
//     //           /> */}
//     //           {/* <img src={logo} alt="Professional workspace" style={{ width: '100%', maxWidth: 500, borderRadius: 16 }} /> */}

//     //           <StatCard>
//     //             <Typography variant="body2" fontWeight="bold">
//     //               Join 10,000+ users
//     //             </Typography>
//     //             <Typography variant="caption" sx={{ opacity: 0.9 }}>
//     //               Growing every day
//     //             </Typography>
//     //           </StatCard>
//     //         </Box>
//     //       </Box>
//     //     </Grid>

//     //     {/* Content Section */}
//     //     <Grid item xs={12} lg={6}>
//     //       <Box sx={{ gap: 3 }}>
//     //         <Box sx={{ mb: 4 }}>
//     //           <Chip 
//     //             label="✨ Now Available" 
//     //             sx={{ 
//     //               backgroundColor: '#e3f2fd', 
//     //               color: '#1976d2',
//     //               fontWeight: 500,
//     //               mb: 2
//     //             }} 
//     //           />
//     //           <Typography 
//     //             variant="h2" 
//     //             component="h1" 
//     //             sx={{ 
//     //               fontWeight: 'bold', 
//     //               color: '#1a1a1a',
//     //               lineHeight: 1.2,
//     //               mb: 2
//     //             }}
//     //           >
//     //             Build Your{' '}
//     //             <Box 
//     //               component="span" 
//     //               sx={{ 
//     //                 background: 'linear-gradient(to right, #1976d2, #9c27b0)',
//     //                 backgroundClip: 'text',
//     //                 WebkitBackgroundClip: 'text',
//     //                 WebkitTextFillColor: 'transparent'
//     //               }}
//     //             >
//     //               Dream Project
//     //             </Box>
//     //           </Typography>
//     //           <Typography 
//     //             variant="h6" 
//     //             sx={{ 
//     //               color: '#666',
//     //               lineHeight: 1.6,
//     //               fontWeight: 'normal'
//     //             }}
//     //           >
//     //             Transform your ideas into reality with our powerful platform. 
//     //             Join thousands of creators, entrepreneurs, and teams who trust us 
//     //             to bring their visions to life.
//     //           </Typography>
//     //         </Box>

//     //         <Box sx={{ mb: 4 }}>
//     //           <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
//     //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//     //               <Box sx={{ width: 12, height: 12, backgroundColor: '#4caf50', borderRadius: '50%' }} />
//     //               <Typography variant="body2" color="text.secondary">No setup required</Typography>
//     //             </Box>
//     //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//     //               <Box sx={{ width: 12, height: 12, backgroundColor: '#4caf50', borderRadius: '50%' }} />
//     //               <Typography variant="body2" color="text.secondary">Free to start</Typography>
//     //             </Box>
//     //           </Box>
              
//     //           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
//     //             <GradientButton size="large">
//     //               Get Started Free
//     //             </GradientButton>
//     //             <Button 
//     //               variant="outlined" 
//     //               size="large"
//     //               sx={{ 
//     //                 fontSize: '18px',
//     //                 padding: '12px 32px',
//     //                 textTransform: 'none',
//     //                 borderWidth: 2,
//     //                 borderRadius: '8px',
//     //                 '&:hover': {
//     //                   borderWidth: 2,
//     //                   backgroundColor: '#f5f5f5',
//     //                 }
//     //               }}
//     //             >
//     //               Watch Demo
//     //             </Button>
//     //           </Box>
//     //         </Box>

//     //         <Box sx={{ pt: 4, borderTop: '1px solid #e0e0e0' }}>
//     //           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//     //             Trusted by leading companies
//     //           </Typography>
//     //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, opacity: 0.6 }}>
//     //             <Typography variant="h6" fontWeight="bold" color="text.secondary">COMPANY</Typography>
//     //             <Typography variant="h6" fontWeight="bold" color="text.secondary">STARTUP</Typography>
//     //             <Typography variant="h6" fontWeight="bold" color="text.secondary">AGENCY</Typography>
//     //           </Box>
//     //         </Box>
//     //       </Box>
//     //     </Grid>
//     //   </Grid>
//     // </Box>
//   );
// };

// export default HeroSection;
