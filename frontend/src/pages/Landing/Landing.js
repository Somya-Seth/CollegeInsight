import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './Landing.css'
import { FaQuestion, FaShare, FaLightbulb } from 'react-icons/fa';
import Logo from './srgilogo.jpg'
import Navbar from '../../components/Navbar/Navbar'


export default function Home() {
    let navigate = useNavigate();
    const routeChangeLogin = () => {
        let path = `/login`;
        navigate(path);
    }
    const routeChangeSignUp = () =>{
        navigate('/signup')
    }
    return (
        <>
        {/* <Navbar/> */}
            <div className='home-root'>
                <img className='srgi_logo_img' src={Logo} alt="Logo"/>
                <div className='left-home'>
                    <div className='home-heading'>
                        <div>Connect with Faculty <br></br>and Students</div>

                    </div>
                    <div className='home-para'>
                        <p>Interact with your Teachers, Seniors, Juniors on Common Platform.<br></br>Get Every Information regarding College on a Single Platform<br></br>and help each other</p>
                    </div>
                    <div className='home-login'>
                        <Button variant="contained" onClick={routeChangeLogin}>Login</Button>
                    </div>
                    <div className='home-signup'>
                        <Button variant="contained" onClick={routeChangeSignUp}>SignUp</Button>
                    </div>
                </div>
                <div className='right-home'>
                    <div className='first-div about'><span className='icon'><FaLightbulb/></span><span className="about-heading">Showcase Your <span style={{fontWeight: 'bold'}}>Skills</span></span></div>
                    <div className='second-div about'><span className='icon'><FaQuestion/></span><span className="about-heading">Ask your <span style={{fontWeight: 'bold'}}>Doubt</span></span></div>
                    <div className='third-div about'><span className='icon'><FaShare/></span><span className="about-heading">Share your <span style={{fontWeight: 'bold'}}> Knowledge</span></span></div>
                </div>
            </div>
        </>
    )
}