import React from 'react'
import './verifyUserMail.css'
import { redirect, useParams } from "react-router";
import { Button } from '@mui/material';
import axios from "axios"
import { useNavigate } from "react-router-dom";

function VerifyUserMail() {
    let { email } = useParams();
    let navigate = useNavigate()
    const login = async ()=>{
        try{
            console.log("email in login", email);
            let userEmail= {
                email:email
            }
            await axios.post("http://localhost:8000/setIsVerifedtrue",userEmail);
            navigate("/login")
        }catch(err){
            console.log("err",err.message)
        }
       
    }
  return (
    <div>
        You have been verified!! Go to Login Page for login to your Account
        <Button onClick={login}>Go to Login Page</Button>
    </div>
  )
}

export default VerifyUserMail
