import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import srgilogo from '../../image/slogo.jpeg'
import "./Login.css"
// import Carousel from "../../components/Carousel/Carousel"
import { useNavigate } from "react-router-dom";
import image1 from '../../image/image1.jpg';
import axios from 'axios';
import swal from "sweetalert";



export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const [errors, setError] = useState('');
  const [isLoginClicked, loginClicked] = useState(false);

  const forgotPassword = async function(email){
    try {
      console.log("email", email);
      // await axios.post('http://localhost:8000/forgetpassword', {email}).then(res => {
      //   console.log("done", res)
      
      // })
      navigate('/forgotPassword')
    } catch (error) {
      console.log("error", error.message)
    }
  }

  const login = async () => {
    loginClicked(true)
    if (user.email && user.password) {
      await axios.post('http://localhost:8000/login', user).then(res => {
        console.log("response", res)
        navigate('/feed')
      }).catch(err => {
        console.log("login error", err);
        handleErrors(err.response.data.message)
      })
    }
  }

  const handleErrors = async (msg) => {
    if (msg == 'Invalid Password') {
      setError('Invalid Password')
    }
    else if (msg == 'user does not exist!Please Signup') {
      swal(
        "User doesnot exists",
        "Please signup",
        "error"
      );
      setError('user does not exist!Please Signup')
    }
    else if (msg == 'Email or Password Incorrect') {
      setError('Email or Password Incorrect')
    }
  }

  return (
    <div className='row__'>
      <div className='col-7 college-image__'>
        {/* <Carousel className="carousel"/>     */}
        <img src={image1} className='image__' alt='' />
      </div>
      <div className='col login-form__'>
        <div className='inner'>
          <img src={srgilogo} className="srgi-logo" alt='logo' />
          <h3>COLLEGE INSIGHT</h3>
          <div>

            <TextField id="outlined-basic" label="Email" type='email' variant="outlined" fullWidth size='small' margin='dense' value={user.email} name="email" onChange={handleChange}
              required
              error={isLoginClicked && (user.email === "" || errors == 'Email or Password Incorrect')}
              helperText={isLoginClicked && user.email === '' ? 'This field is required' : errors == 'Email or Password Incorrect' ? 'Email or Password Incorrect' : ''} />

            <TextField id="outlined-basic" label="password" type='password' variant="outlined" fullWidth size='small' margin='dense' value={user.password} name="password" onChange={handleChange}
              required
              error={isLoginClicked && (user.password === '' || errors == 'Invalid Password')}
              helperText={isLoginClicked && user.password === '' ? 'This field is required' : errors == 'Invalid Password' ? 'Invalid Password' : ''} />

          </div>
          <Button variant = "contained" className='forget_password_' onClick={()=>forgotPassword(user.email)} >Forget Password</Button>
          <Button variant="contained" className='login_button' onClick={login}>Login</Button>
          <div className='more_'>Don't have an account <span className='blue' onClick={() => {
            navigate('/signup')
          }}>Signup</span></div>
          <div className='more_'>Want to know about college? <a href='https://srgi.ac.in/' className='blue' target='__blank'>Go here</a></div>
        </div>
      </div>
    </div>
  )
}