// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Container,
//   CircularProgress,
//   Box,
// } from '@mui/material';
// import axios from 'axios';
// const Dashboard=()=>{
//     const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
     
//      useEffect(() => {
//          const fetchMatches = async () => {
//       const token = localStorage.getItem("token"); // get token from localStorage

//       try {
//         const res = await axios.get("http://localhost:5000/api/match", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(res.data);
//         setLoading(false);
//         console.log("Matches:", res.data);
//       } catch (error) {
//         console.error("Error fetching matches:", error.response?.data || error.message);
//       }
//     };

//     fetchMatches();
//       }, []);
//        if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );
//   }
//      return (
// <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         User Dashboard
//       </Typography>
//       <Grid container spacing={3}>
//         {users.map(user => (
//           <Grid item xs={12} sm={6} md={4} key={user._id}>
//             <Card sx={{ minHeight: 180 }}>
//               <CardContent>
//                 <Typography variant="h6" component="div">
//                   {user?.user?.name ?? 'No Name'}
//                 </Typography>
//                 <Typography color="text.secondary">
//                   Email: {user?.user?.email ?? 'N/A'}
//                 </Typography>
//                 <Typography variant="body2">
//                   Interests: {user?.interests?.join(', ') ?? 'None'}
//                 </Typography>
//                 <Typography variant="body2">
//                   Study Time: {user?.preferredStudyTime?.start ?? 'N/A'} - {user?.preferredStudyTime?.end ?? 'N/A'}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }
// export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import Navigation from './Navigation';
// import UserCard from './UserCard';
// import { toast } from 'sonner';

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("No authentication token found. Please login again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/api/match", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setUsers(data);
//         setLoading(false);
//         console.log("Matches:", data);
//         toast.success(`Found ${data.length} study matches!`);
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//         toast.error("Failed to fetch study matches. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, []);

//   const handleProfileUpdate = () => {
//     toast.info("Profile update feature coming soon!");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     toast.success("Logged out successfully!");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navigation onProfileUpdate={handleProfileUpdate} onLogout={handleLogout} />
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation onProfileUpdate={handleProfileUpdate} onLogout={handleLogout} />

//       <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Buddy Dashboard</h1>
//           <p className="text-gray-600">
//             Connect with fellow students and find your perfect study partners
//           </p>
//           <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
//             <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
//               {users.length} matches found
//             </span>
//           </div>
//         </div>

//         {users.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {users.map((user) => (
//               <UserCard key={user._id} user={user} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="mb-4">
//               <div className="mx-auto h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
//                 <span className="text-gray-400 text-3xl">👥</span>
//               </div>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No study matches found</h3>
//             <p className="text-gray-500">
//               Try updating your profile or interests to find more study buddies!
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Container,
//   CircularProgress,
//   Box,
// } from '@mui/material';
// import axios from 'axios';

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch matches
//   useEffect(() => {
//     const fetchMatches = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const res = await axios.get("http://localhost:5000/api/match", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(res.data);
//         setLoading(false);
//         console.log("Matches:", res.data);
//       } catch (error) {
//         console.error("Error fetching matches:", error.response?.data || error.message);
//       }
//     };

//     fetchMatches();
//   }, []);

//   // Handle logout logic
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login"; // redirect to login page
//   };

//   // Handle profile logic (optional routing)
//   const handleProfile = () => {
//     window.location.href = "/profile";
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <>
//       {/* Navigation Bar */}
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Peer Study Platform
//           </Typography>
//           <Button color="inherit" onClick={handleProfile}>
//             Profile
//           </Button>
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Dashboard Content */}
//       <Container sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           User Dashboard
//         </Typography>
//         {/* <Grid container spacing={3}>
//           {users.map((user) => (
//             <Grid item xs={12} sm={6} md={4} key={user._id}>
//               <Card sx={{ minHeight: 180 }}>
//                 <CardContent>
//                   <Typography variant="h6" component="div">
//                     {user?.user?.name ?? 'No Name'}
//                   </Typography>
//                   <Typography color="text.secondary">
//                     Email: {user?.user?.email ?? 'N/A'}
//                   </Typography>
//                   <Typography variant="body2">
//                     Interests: {user?.interests?.join(', ') ?? 'None'}
//                   </Typography>
//                   <Typography variant="body2">
//                     Study Time: {user?.preferredStudyTime?.start ?? 'N/A'} -{' '}
//                     {user?.preferredStudyTime?.end ?? 'N/A'}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid> */}
//         <Grid item xs={12} sm={6} md={4} key={user._id}>
//   <Card
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       height: '100%',
//       borderRadius: 3,
//       boxShadow: 3,
//       transition: 'transform 0.2s ease-in-out',
//       '&:hover': {
//         transform: 'scale(1.03)',
//         boxShadow: 6,
//       },
//     }}
//   >
//     <CardContent>
//       <Typography variant="h6" component="div" color="primary" gutterBottom>
//         {user?.user?.name ?? 'No Name'}
//       </Typography>

//       <Typography variant="body2" color="text.secondary" mb={1}>
//         <strong>Email:</strong> {user?.user?.email ?? 'N/A'}
//       </Typography>

//       <Typography variant="body2" color="text.secondary" mb={1}>
//         <strong>Interests:</strong>{' '}
//         {user?.interests?.length ? user.interests.join(', ') : 'None'}
//       </Typography>

//       <Typography variant="body2" color="text.secondary">
//         <strong>Study Time:</strong>{' '}
//         {user?.preferredStudyTime?.start ?? 'N/A'} -{' '}
//         {user?.preferredStudyTime?.end ?? 'N/A'}
//       </Typography>
//     </CardContent>

//     <Box p={2} display="flex" justifyContent="flex-end">
//       <Button
//         variant="contained"
//         color="primary"
//         size="small"
//         onClick={() => alert(`Start chat with ${user?.user?.name}`)} // You can replace with routing or logic
//       >
//         Chat
//       </Button>
//     </Box>
//   </Card>
// </Grid>

//       </Container>
//     </>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  CircularProgress,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://studybuddy-64ue.onrender.com/api/match", {
        // const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/match`, {
        // const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/match`, {


          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
        setLoading(false);
        console.log("Matches:", res.data);
      } catch (error) {
        console.error("Error fetching matches:", error.response?.data || error.message);
      }
    };
    fetchMatches();
  }, []);
  const navigate = useNavigate();

const handleChat = (userObject) => {
  console.log(userObject)
  const currentUser = JSON.parse(localStorage.getItem("userdata"));
  console.log(currentUser);
  const myId = currentUser?._id;
  const buddyId = userObject?.user?._id;

  console.log("My ID:", myId);
  console.log("Buddy ID:", buddyId);

  if (!myId || !buddyId) {
    alert("User info is missing.");
    return;
  }

  if (myId === buddyId) {
    alert("You cannot chat with yourself.");
    return;
  }

  localStorage.setItem("buddyId", buddyId);
  navigate(`/chat/${buddyId}`);
};
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleProfile = () => {
    window.location.href = "/profile";
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Peer Study Platform
          </Typography>
          <Button color="inherit" onClick={handleProfile}>
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Dashboard
        </Typography>

        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" color="primary" gutterBottom>
                    {user?.user?.name ?? 'No Name'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Email:</strong> {user?.user?.email ?? 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Interests:</strong>{' '}
                    {user?.interests?.length ? user.interests.join(', ') : 'None'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Study Time:</strong>{' '}
                    {user?.preferredStudyTime?.start ?? 'N/A'} -{' '}
                    {user?.preferredStudyTime?.end ?? 'N/A'}
                  </Typography>
                </CardContent>

                <Box p={2} display="flex" justifyContent="flex-end">
                  {/* <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => alert(`Start chat with ${user?.user?.name}`)}
                  >
                    Chat
                  </Button> */}
                 <Button
  variant="contained"
  color="primary"
  size="small"
  onClick={() => handleChat(user)}
>
  Chat
</Button>
{/* <Button
  variant="contained"
  color="secondary"
  size="small"
  onClick={() => {
    alert("Chat button clicked");
    console.log("Chat button clicked");
  }}
>
  Test Chat
</Button> */}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Container,
//   CircularProgress,
//   Box,
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch matched users
//   useEffect(() => {
//     const fetchMatches = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await axios.get("http://localhost:5000/api/match", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(res.data);
//         setLoading(false);
//         console.log("Matches:", res.data);
//       } catch (error) {
//         console.error("Error fetching matches:", error.response?.data || error.message);
//       }
//     };
//     fetchMatches();
//   }, []);

//   // Handle chat button click
//   const handleChat = (selectedUserId, userObj) => {
//     const currentUser = JSON.parse(localStorage.getItem("userdata"));

//     if (!currentUser || !currentUser._id) {
//       alert("Current user info is missing. Please log in again.");
//       return;
//     }

//     const myId = currentUser._id;
//   console.log(selectedUserId)
//   console.log(myId)
//     if (selectedUserId === myId) {
//       alert("You cannot chat with yourself.");
//       return;
//     }

//     // Save selected user as buddy
//     localStorage.setItem("buddyId", selectedUserId);

//     // Navigate to chat page
//     navigate(`/chat/${selectedUserId}`);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userdata");
//     localStorage.removeItem("buddyId");
//     window.location.href = "/";
//   };

//   // Handle profile click
//   const handleProfile = () => {
//     window.location.href = "/profile";
//   };

//   // Loading indicator
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <>
//       {/* Navigation Bar */}
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Peer Study Platform
//           </Typography>
//           <Button color="inherit" onClick={handleProfile}>
//             Profile
//           </Button>
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Dashboard Content */}
//       <Container sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           User Dashboard
//         </Typography>

//         <Grid container spacing={3}>
//           {users.map((user) => (
//             <Grid item xs={12} sm={6} md={4} key={user._id}>
//               <Card
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   height: '100%',
//                   borderRadius: 3,
//                   boxShadow: 3,
//                   transition: 'transform 0.2s ease-in-out',
//                   '&:hover': {
//                     transform: 'scale(1.03)',
//                     boxShadow: 6,
//                   },
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" component="div" color="primary" gutterBottom>
//                     {user?.user?.name ?? 'No Name'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" mb={1}>
//                     <strong>Email:</strong> {user?.user?.email ?? 'N/A'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" mb={1}>
//                     <strong>Interests:</strong>{' '}
//                     {user?.interests?.length ? user.interests.join(', ') : 'None'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Study Time:</strong>{' '}
//                     {user?.preferredStudyTime?.start ?? 'N/A'} -{' '}
//                     {user?.preferredStudyTime?.end ?? 'N/A'}
//                   </Typography>
//                 </CardContent>

//                 <Box p={2} display="flex" justifyContent="flex-end">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="small"
//                     onClick={() => handleChat(user?.user?._id, user)}
//                   >
//                     Chat
//                   </Button>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default Dashboard;
