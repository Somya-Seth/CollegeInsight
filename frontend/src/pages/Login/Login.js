import React, {useState, useContext} from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import srgilogo from '../../image/slogo.jpeg'
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
    const {name, value} = e.target
    setUser({
      ...users,
      [name]: value
    })
  }

  const [errors, setError] = useState('');
  const [isLoginClicked, loginClicked] = useState(false);
  const { isFetching,isLoggedIn, dispatch, error } = useContext(AuthContext);
  
  // when login button is clicked
  const login = async() => {
    loginClicked(true)
    if(users.email && users.password){
      try{
        await loginCall(
          {email: users.email, password: users.password},
          dispatch
        ).then(res => {
          if(res == 'Sorry! You are blocked'){
            handleErrors('Sorry! You are blocked')
          }
          else if(res == 'user does not exist!Please Signup'){
            handleErrors('user does not exist!Please Signup')
          }
          else if(res == 'Invalid Password'){
            handleErrors('Invalid Password')
          }
          else{
            navigate('/feed')
          }
        })
        .catch(err => {
          console.log(err)
        });
      }
      catch(err){
        console.log("error occured in loggin in", err)
      }
  }
}

const handleErrors = async(msg) => {
    if(msg == 'Invalid Password'){
      setError('Invalid Password')
    }
    else if(msg == 'user does not exist!Please Signup'){
      swal(
        "User doesnot exists",
        "Please signup",
        "error"
      );
      setError('user does not exist!Please Signup')
    }
    else if(msg == 'Email or Password Incorrect'){
      setError('Email or Password Incorrect')
    }
    else if(msg == 'Sorry! You are blocked'){
      swal(
        "Sorry! Your are blocked",
        "You will not be able to login now.",
        "error"
      );
      setError('Sorry! You are blocked')
    }
  }

  return (
    <>
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

            <TextField id="outlined-basic" label="Email" type='email' variant="outlined" fullWidth size='small' margin='dense' value={users.email} name="email" onChange={handleChange} 
            required
            error={isLoginClicked && (users.email===""|| errors == 'Email or Password Incorrect')}
            helperText={isLoginClicked && users.email===''?'This field is required' : errors == 'Email or Password Incorrect' ? 'Email or Password Incorrect' : ''}/>

            <TextField id="outlined-basic" label="password" type='password' variant="outlined" fullWidth size='small' margin='dense' value={users.password} name="password" onChange={handleChange}
            required
            error={isLoginClicked && (users.password === ''|| errors == 'Invalid Password')}
            helperText={isLoginClicked && users.password === '' ? 'This field is required' : errors == 'Invalid Password' ? 'Invalid Password': ''} />

          </div>
          <div className='forget_password'>Forget Password</div>
          <Button variant="contained"  className='login_button' onClick={login}>Login</Button>
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