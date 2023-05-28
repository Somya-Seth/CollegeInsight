import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import cilogo from '../../image/CI_logo.png'
import "./Signup.css"
// import Carousel from "../../components/Carousel/Carousel"
import { useNavigate } from "react-router-dom";
import image1 from '../../image/image1.jpg'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import swal from "sweetalert";


export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
  name: "",
    enrNo: "",
    email: "",
    password: "",
    role: ""
  })

  const [errors, setError] = useState('');
  const [isClickedSignup, signupClicked] = useState(false);

  const roles = [
    {
      value: 'TEACHER'
    },
    {
      value: 'STUDENT'
    }
  ];

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const register = (e) => {
    signupClicked(true)
    e.preventDefault()
    const temp = axios.post('http://localhost:8000/signup', user).then(res => {
      console.log("response", res)
      navigate('/login')
    }).catch(err => {
      console.log("error in signup", err.response.data.message)
      handleError(err.response.data.message)
    })
  }

  const handleError = (err) => {
    if(err == 'invalid email address provided'){
      setError('Invalid email')
    }
    else if(err == 'password criteria doesnot match'){
      setError('Invalid password')
    }
    else if(err == 'user already exists'){
      swal(
        "User already exists",
        "Please try with different email",
        "error"
      );
    }
  }
  
  return (
    <>
    <div className='row'>
      <div className='login-form'>
        <div className='inner'>
          <img src={cilogo} className="ci-logo" alt='logo' />
          <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth size='small' margin='dense' value={user.name} name="name" onChange={handleChange} required 
            error={isClickedSignup && user.name === "" }
            helperText={isClickedSignup && user.name === "" ? 'This field is required!' : ''}/>

            <TextField id="outlined-basic" label="Enrollment Number" variant="outlined" fullWidth size='small' margin='dense' value={user.enrNo} name="enrNo" onChange={handleChange} required 
            error={isClickedSignup && user.enrNo === ""}
            helperText={isClickedSignup && user.enrNo === "" ? 'This field is required!' : ''}/>

            <TextField id="outlined-basic" label="Email" type='email' variant="outlined" fullWidth size='small' margin='dense' value={user.email} name="email" onChange={handleChange} required 
            error={isClickedSignup && (user.email === "" || errors == 'Invalid email')}
            helperText={isClickedSignup && user.email === "" ? 'This field is required!' : errors == 'Invalid email' ? 'Invalid email' : ''}/>

            <TextField id="outlined-basic" label="password" type='password' variant="outlined" fullWidth size='small' margin='dense' value={user.password} name="password" onChange={handleChange} required 
            error={isClickedSignup && (user.password === "" || errors == 'Invalid password')}
            helperText={isClickedSignup && user.password === "" ? 'This field is required!' : errors == 'Invalid password' ? 
            'Password must contains an uppercase letter, a lowercase letter, a digit, a special character and length should be 8-16 characters' : ''}/>

            <TextField id="outlined-basic" label="Role" variant="outlined" fullWidth size='small' margin='dense' value={user.role} name="role" required select onChange={handleChange} 
              defaultValue="Role"
              error={isClickedSignup && user.role === ""}
              helperText={isClickedSignup && user.role === "" ? 'This field is required!' : ' '}>
               {roles.map((option) => (
               <MenuItem key={option.value} value={option.value}>
                 {option.value}
               </MenuItem>
               ))}
            </TextField>
          </div>
          <div className='forget_password'></div>
          <Button fullWidth className='signup_button' onClick={register}>signup</Button>
          <div className='more_'>Want to know about college? <a href='https://srgi.ac.in/' className='blue' target='__blank'>Go here</a></div>
        </div>
      </div>
    </div>
    </>
  )
}