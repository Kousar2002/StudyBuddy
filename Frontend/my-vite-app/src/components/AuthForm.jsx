import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  Grid,
  Link,
  CircularProgress,
} from '@mui/material';
import { Login, PersonAdd } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL
function TabPanel({ children, value, index, ...other }) {
  // const BASE_URL = process.env.VITE_API_URL;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const AuthForm = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  const [loginData,setLoginData]=useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
 const handleChange = (e) => {
  const { name, value } = e.target;
  if(tabValue==1){
      setFormData({
    ...formData,
   [name]: value,
  });
  }else{
    setLoginData({
      ...loginData,
     [name]: value,
    })
  }
  
  // console.log(formData)
};
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(tabValue)
    if(tabValue==1){
       if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return; // stop submission
        }
       const dataToSend = { ...formData };
       delete dataToSend.confirmPassword;

      try {
        // const res = await axios.post("https://studybuddy-64ue.onrender.com/api/auth/register", dataToSend);
        const res=await axios.post(`${BASE_URL}/api/auth/register`, dataToSend);
        alert("user registered successfully");
     } catch (error) {
        console.error("Error:", error.response?.data || error.message);
     }
  }else {
       try {
          //  const res = await axios.post("https://studybuddy-64ue.onrender.com/api/auth/login", loginData);
           const res=await axios.post(`${BASE_URL}/api/auth/login`, loginData);
           console.log(res);
           const { name,token } = res.data;
           console.log(token);
           localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(name));
          localStorage.setItem("userdata",JSON.stringify(res.data))
          alert("user loged in successfully");
          // const profileRes = await axios.get("https://studybuddy-64ue.onrender.com/api/me", {
          //    headers: { Authorization: `Bearer ${token}` },
          // });
          const profileRes = await axios.get(`${BASE_URL}/api/me`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

    if (profileRes.data) {
      navigate("/dashboard");
    }
    // else{
    //       navigate("/profile");
    // }
       } catch (error) {
           if (error.response?.status === 404) {
      // No profile exists
      navigate("/profile");
    } else {
      console.error("Login error:", error.response?.data || error.message);
    }
       }

  }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Form submitted');
    }, 2000);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Card sx={{ boxShadow: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            aria-label="auth tabs"
          >
            <Tab 
              icon={<Login />} 
              label="Login" 
              iconPosition="start"
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              icon={<PersonAdd />} 
              label="Sign Up" 
              iconPosition="start"
              sx={{ textTransform: 'none' }}
            />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <CardContent>
            <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
              Enter your credentials to access your account
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                  value={loginData.email}
                    onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                 name="password"
                variant="outlined"
                  value={loginData.password}
                    onChange={handleChange}
                required
                sx={{ mb: 3 }}
              />
              <Button 
                type="submit" 
                fullWidth 
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mb: 2, textTransform: 'none' }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>
            </Box>
            
            <Box textAlign="center">
              <Link href="#" variant="body2" color="primary">
                Forgot your password?
              </Link>
            </Box>
          </CardContent>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <CardContent>
            <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
              Create account
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 1 }}>
              Enter your information to create your account
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
               
              </Grid>
              <TextField
                    fullWidth
                    label="Full name"
                    name="name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    required
                     sx={{ mb: 2 }}
                  />
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                  value={formData.email}
                    onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                  value={formData.password}
                    onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="Password"
                variant="outlined"
                 value={formData.confirmPassword}
                    onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <Button 
                type="submit" 
                fullWidth 
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ textTransform: 'none' }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Create Account"}
              </Button>
            </Box>
          </CardContent>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default AuthForm;
