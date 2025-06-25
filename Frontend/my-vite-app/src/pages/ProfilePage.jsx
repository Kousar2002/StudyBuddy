// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   Checkbox,
//   ListItemText,
//   OutlinedInput,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const ProfilePage = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [formData, setFormData] = useState({
//     interests: [],
//     preferredStudyTime: {
//       start: '',
//       end: '',
//     },
//     durationInHours: '',
//   });

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetch('http://localhost:5000/api/subjects')
//       .then(res => res.json())
//       .then(data => setSubjects(data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     // Handle nested preferredStudyTime object
//     if (name === 'start' || name === 'end') {
//       setFormData(prev => ({
//         ...prev,
//         preferredStudyTime: {
//           ...prev.preferredStudyTime,
//           [name]: value,
//         }
//       }));
//     } else if (name === 'interests') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: typeof value === 'string' ? value.split(',') : value
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!token) {
//       console.error("No token found in localStorage.");
//       return;
//     }

//     const payload = {
//       interests: formData.interests,
//       preferredStudyTime: {
//         start: formData.preferredStudyTime.start,
//         end: formData.preferredStudyTime.end,
//       },
//       durationInHours: Number(formData.durationInHours),
//     };

//     try {
//       const res = await axios.post("http://localhost:5000/api/profile", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       alert("Profile created successfully");
//       navigate("/Dashboard");
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}
//     >
//       <Typography variant="h5" mb={3}>
//         Hello {user || 'User'} - Complete Your Profile
//       </Typography>

//       {/* Interests Multi-select */}
//       <FormControl fullWidth margin="normal">
//         <InputLabel id="interests-label">Interests</InputLabel>
//         <Select
//           labelId="interests-label"
//           id="interests"
//           name="interests"
//           multiple
//           value={formData.interests}
//           onChange={handleChange}
//           input={<OutlinedInput label="Interests" />}
//           renderValue={(selected) => selected.join(', ')}
//         >
//           {subjects.map((subject) => (
//             <MenuItem key={subject} value={subject}>
//               <Checkbox checked={formData.interests.includes(subject)} />
//               <ListItemText primary={subject} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Preferred Study Time: Start */}
//       <TextField
//         fullWidth
//         margin="normal"
//         label="Preferred Start Time"
//         type="time"
//         name="start"
//         value={formData.preferredStudyTime.start}
//         onChange={handleChange}
//         InputLabelProps={{ shrink: true }}
//         inputProps={{ step: 300 }} // 5 min steps
//         required
//       />

//       {/* Preferred Study Time: End */}
//       <TextField
//         fullWidth
//         margin="normal"
//         label="Preferred End Time"
//         type="time"
//         name="end"
//         value={formData.preferredStudyTime.end}
//         onChange={handleChange}
//         InputLabelProps={{ shrink: true }}
//         inputProps={{ step: 300 }}
//         required
//       />

//       {/* Duration in Hours */}
//       <TextField
//         fullWidth
//         margin="normal"
//         label="Duration (in hours)"
//         name="durationInHours"
//         type="number"
//         inputProps={{ min: 1, max: 12 }}
//         value={formData.durationInHours}
//         onChange={handleChange}
//         required
//       />

//       <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
//         Submit Profile
//       </Button>
//     </Box>
//   );
// };

// export default ProfilePage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [subjects, setSubjects] = useState([]);
  // const [able,setAble]=useState(false);
  const [formData, setFormData] = useState({
    interests: [],
    preferredStudyTime: {
      start: '',
      end: '',
    },
    durationInHours: '',
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    // fetch('http://localhost:5000/api/subjects')
    fetch(`${process.env.REACT_APP_API_URL}/api/subjects`)
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
  // console.log(name);
  // console.log(value);
    // Handle nested preferredStudyTime object
    if (name === 'start' || name === 'end') {
      setFormData(prev => ({
        ...prev,
        preferredStudyTime: {
          ...prev.preferredStudyTime,
          [name]: value,
        }
      }));
    } else if (name === 'interests') {
      setFormData(prev => ({
        ...prev,
        [name]: typeof value === 'string' ? value.split(',') : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }
    const {start,end}=formData.preferredStudyTime;
    const startTime=new Date(`1970-01-01T${start}:00`);
    const endTime=new Date(`1970-01-01T${end}:00`);
    if(startTime>=endTime){
     
      alert("Start time must be earlier than end time");
      return;
    }
    const diffInMs=endTime-startTime;
    const actualDuration=diffInMs/(1000*60*60);
    const enteredDuration=Number(formData.durationInHours);
    if(actualDuration !== enteredDuration){
      
      alert(`Duration mismatch:Based on start and end time the actual duration is ${actualDuration} hour(s).`)
      return;
    }
    const payload = {
      interests: formData.interests,
      preferredStudyTime: {
        start: formData.preferredStudyTime.start,
        end: formData.preferredStudyTime.end,
      },
      durationInHours: Number(formData.durationInHours),
    };

    try {
      // const res = await axios.post("http://localhost:5000/api/profile", payload, {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Profile created successfully");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}
    >
      <Typography variant="h5" mb={3}>
        Hello {user || 'User'} - Complete Your Profile
      </Typography>

      {/* Interests Multi-select */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="interests-label">Interests</InputLabel>
        <Select
          labelId="interests-label"
          id="interests"
          name="interests"
          multiple
          value={formData.interests}
          onChange={handleChange}
          input={<OutlinedInput label="Interests" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {subjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              <Checkbox checked={formData.interests.includes(subject)} />
              <ListItemText primary={subject} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Preferred Study Time: Start */}
      <TextField
        fullWidth
        margin="normal"
        label="Preferred Start Time"
        type="time"
        name="start"
        value={formData.preferredStudyTime.start}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }} // 5 min steps
        required
      />

      {/* Preferred Study Time: End */}
      <TextField
        fullWidth
        margin="normal"
        label="Preferred End Time"
        type="time"
        name="end"
        value={formData.preferredStudyTime.end}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }}
        required
      />

      {/* Duration in Hours */}
      <TextField
        fullWidth
        margin="normal"
        label="Duration (in hours)"
        name="durationInHours"
        type="number"
        inputProps={{ min: 1, max: 12 }}
        value={formData.durationInHours}
        onChange={handleChange}
        required
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} >
        Submit Profile
      </Button>
    </Box>
  );
};

export default ProfilePage;

