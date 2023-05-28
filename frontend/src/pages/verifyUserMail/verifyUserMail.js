import React from 'react'
import './verifyUserMail.css'
import { redirect, useParams } from "react-router";
import { Button } from '@mui/material';
import axios from "axios"
import { useNavigate } from "react-router-dom";

function VerifyUserMail() {
    let { email } = useParams();
    let navigate = useNavigate()
    const login = async () => {
        try {
            console.log("email in login", email);
            let userEmail = {
                email: email
            }
            await axios.post("http://localhost:8000/setIsVerifedtrue", userEmail);
            navigate("/login")
        } catch (err) {
            console.log("err", err.message)
        }

    }
    return (
        <div className='forget_pass_container'>
            <div style={{height:"fit-content"}}  className='forget_pass_form_2'>
                <h4 style ={{marginTop:"2rem"}}>You have been verified!! Go to Login Page for login to your Account</h4>
                <Button style={{marginTop:"2rem", marginBottom:"1rem",fontSize:"1.2rem"}} onClick={login}>Go to Login Page</Button>
            </div>

        </div>
    )
}

export default VerifyUserMail
