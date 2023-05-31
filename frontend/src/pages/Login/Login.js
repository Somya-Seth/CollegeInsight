import React, { useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import cilogo from '../../image/CI_logo.png'
import "./Login.css"
// import Carousel from "../../components/Carousel/Carousel"
import { useNavigate } from "react-router-dom";
import image1 from '../../image/image1.jpg';
import axios from 'axios';
import swal from "sweetalert";
import Navbar from '../../components/Navbar/Navbar'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../Context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [users, setUser] = useState({
    email: "",
    password: "",
  })


  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...users,
      [name]: value
    })
  }

  const [errors, setError] = useState('');
  const [isLoginClicked, loginClicked] = useState(false);
  const { isFetching, isLoggedIn, dispatch, error } = useContext(AuthContext);

  const forgotPassword = async function (email) {
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


  // when login button is clicked
  const login = async () => {
    console.log("users in ", users)
    const userData = await axios.get(`http://localhost:8000/users?email=${users.email}`)
    console.log("userData", userData)
    loginClicked(true)
    // if (users.email && users.password && userData.data[0].isVerified) {
    if(userData.data.length>0 && !userData?.data[0]?.isVerified){
      handleErrors("First Verify Yourself Through Mail by signing in with Correct Mailid")
      return 
    }
    else if (users.email && users.password) {
      try {
        await loginCall(
          { email: users.email, password: users.password },
          dispatch
        ).then(res => {
          if (res == 'Sorry! You are blocked') {
            handleErrors('Sorry! You are blocked')
          }
          else if (res == 'user does not exist!Please Signup') {
            handleErrors('user does not exist!Please Signup')
          }
          else if (res == 'Invalid Password') {
            handleErrors('Invalid Password')
          }
          // else if (!userData.data[0].isVerified) {
          //   handleErrors("First Verify Yourself Through Mail by signing in with Correct Mailid")
          // }
          else {
            navigate('/feed')
          }
        })
          .catch(err => {
            console.log(err)
          });
      }
      catch (err) {
        console.log("error occured in loggin in", err)
      }
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
    else if (msg == 'Sorry! You are blocked') {
      swal(
        "Sorry! Your are blocked",
        "You will not be able to login now.",
        "error"
      );
      setError('Sorry! You are blocked')
    } else if (msg == "First Verify Yourself Through Mail by signing in with Correct Mailid") {
      swal("Sorry! You are not verified!",
        "Verify Yourself through Mail with which you have Registered",
        "error")
      setError("First Verify Yourself Through Mail by signing in with Correct Mailid")
    }
  }

  return (
    <>
      <div className='row__'>
        <div className='login-form__'>
          <div className='inner'>
            <img src={cilogo} className="ci-logo" alt='logo' />
            <div className='login_textFields'>

              <TextField id="outlined-basic" label="Email" type='email' variant="outlined" fullWidth size='small' margin='dense' value={users.email} name="email" onChange={handleChange}
                required
                error={isLoginClicked && (users.email === "" || errors == 'Email or Password Incorrect')}
                helperText={isLoginClicked && users.email === '' ? 'This field is required' : errors == 'Email or Password Incorrect' ? 'Email or Password Incorrect' : ''} />

              <TextField id="outlined-basic" label="password" type='password' variant="outlined" fullWidth size='small' margin='dense' value={users.password} name="password" onChange={handleChange}
                required
                error={isLoginClicked && (users.password === '' || errors == 'Invalid Password')}
                helperText={isLoginClicked && users.password === '' ? 'This field is required' : errors == 'Invalid Password' ? 'Invalid Password' : ''} />

            </div>
            <button className='forget_password_' onClick={() => forgotPassword(users.email)}>Forget Password</button>
            <button className='login_button' onClick={login}>Login</button>
            <div className='more_'>Don't have an account <span className='blue' onClick={() => {
              navigate('/signup')
            }}>Signup</span></div>
            <div className='more_'>Want to know about college? <a href='https://srgi.ac.in/' className='blue' target='__blank'>Go here</a></div>
          </div>
        </div>
      </div>
    </>
  )
}