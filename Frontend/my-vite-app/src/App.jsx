import { useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route ,useNavigate} from 'react-router-dom';
import './App.css'
import axios from "axios";
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import  Dashboard from './pages/Dashboard';
import { getToken } from "./utils/auth";
import ChatPage from "./pages/ChatPage";
export const BASE_URL = import.meta.env.VITE_API_URL
console.log(BASE_URL )
// const Redirector = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkProfile = async () => {
//       const token = getToken();
//       if (!token) {
//         navigate("/");
//         return;
//       }

//       try {
//         const res = await axios.get("/api/profile/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         navigate("/dashboard");
//       } catch (err) {
//         if (err.response?.status === 404) {
//           navigate("/profile");
//         } else {
//           console.error(err);
//         }
//       }
//     };

//     checkProfile();
//   }, [navigate]);

//   return <div>Loading...</div>;
// };

function App() {
//  const ChatPageWrapper = () => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     const selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
//     return <ChatPage currentUser={currentUser} selectedUser={selectedUser} />;
//   };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/chat/:id" element={<ChatPage/>} />
      </Routes>
    </Router>
    // <div>
    //   {/* <LandingPage/> */}
    //   <ProfilePage/>
    //    {/* <h1>Logo Test</h1>
    //   <img src={logo} alt="Test logo" style={{ width: 200, height: 'auto' }} /> */}
    // </div>
  )
}

export default App
