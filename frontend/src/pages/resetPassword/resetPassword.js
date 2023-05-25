import React, { useState } from 'react'
import './resetPassword.css'
import { useParams } from "react-router";
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

// function abc(){

//   console.log("xysjbna", token)
// }

function ResetPassword(props) {
  const navigate = useNavigate();
  let { token } = useParams();
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    console.log("changed password");
    setPassword(e.target.value);
  }

  const changePassword = async (password) => {
    console.log("token password", token, password);
    await axios.get(`http://localhost:8000/resetpassword?token=${token}&password=${password}`).then(res => {
      console.log("res", res);
      navigate('/login')
    }).catch(err => {
      console.log("error", err.message)
    })
  }

  return (
    <>
      <div className='container'>
        <div className='inner-container'>
          <h2>Enter New Password</h2>
          <TextField id="outlined-basic" style={{marginBottom: '1rem'}} label="Password" type='password' variant="outlined" fullWidth size='small' margin='dense' value={password} name="email" onChange={handleChange}></TextField>
          <Button variant="contained" onClick={() => changePassword(password)} className='c_p_btn'>Change Password</Button>
        </div>
      </div>
    </>
  )
}

export default ResetPassword