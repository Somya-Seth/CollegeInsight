import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import './forgotPassword.css'
import axios from 'axios'

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const handleChange = (e) => {
        console.log("inside handle change", e.target.value)
        setEmail(e.target.value)
    }
    const sendLinkButton = async (email) => {
        console.log("send link", email)
        await axios.post('http://localhost:8000/forgetpassword', { email: email }).then(res => {
            console.log("response", res)
        })
            .catch(err => {
                console.log("err", err.message)
            })
    }
    return (
        <div className='forget_pass_container'>
            <div className='forget_pass_form'>
                <h1>Enter your Mail</h1>
                <div className='forgotpassword'>
                    <p style={{ color: "blue" }}>Reset your password in two easy steps</p>
                    <TextField id="outlined-basic" label="Email" type='email' variant="outlined" fullWidth size='small' margin='dense' value={email} name="email" onChange={handleChange}></TextField>
                    <div className='sendLink-container'>
                        <Button variant="contained" className='sendLinkButton' onClick={() => sendLinkButton(email)}>Send Link</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
