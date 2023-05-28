import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./Navbar.css";
import navLogo from '../../image/CI_logo_light.png'
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiFillHome } from "react-icons/ai"
import { BsFillChatDotsFill } from "react-icons/bs";
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user")
    navigate('/login')
  }

  const messenger = () => {

    navigate("/messenger")
  }

  const [userData, setUserData] = useState([])
  useEffect(() => {
    (async () => {
      await axios.get('http://localhost:8000/users', { params: user }).then(res => {
        setUserData(res.data[0])
      }).catch(err => {
        console.log("error occured in messenger", err);
      })
    })()
  }, [])

  if (userData && userData?.profilePicture) {
    console.log("inside")
    var blob = new Blob([Int8Array.from(userData?.profilePicture?.data?.data)], { type: userData?.profilePicture?.contentType });
    var image = window.URL.createObjectURL(blob);
    console.log("final image", image);
  }
  return (
    <div className="navbar">
      <img className="nav_logo" src={navLogo}></img>
      <div className="nav_SRGI">SR Group of Institutions</div>
      
      <div className="icons">
        <AiFillHome style={{cursor: 'pointer'}} onClick={() => navigate('/feed')}/>
        <BsFillChatDotsFill onClick={messenger} style={{cursor: 'pointer'}}/>
      </div>

      <div className="last">
         <div className="avatar">
          {
            userData.profilePicture ? <img src={image} alt="no image"></img> : <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBQQH/8QALBAAAgECBQMDAgcAAAAAAAAAAAECAxEEEiExURRBYSJTcUKxEzIzUpGSof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD7iAAAAAAAACHJLuRnQFgVzx5JTT2YEgAAAAAAAAAAAZznfRATKdttWUcm9yAVAAAAABZTaNIyTMRcK3BWEr/JYgAAAAQwK1JW0Mw9WCoAFZyywlLhNgebF4p05OnTtmW74PDKcpP1Sb+WQ2223uyCK0p1qlN3jJ/HJ0cPXVeF1o1ujlG+Ck44iK7S0YHUABUE7ao2i7q5iXpvW3JFaAAAVm7IsUqbIDMAFQIks0WuUSAOLKLhJxluiDp4rCqt6ou0/ueGWGrR3pt/GpGmR6MBDNXUu0dRTwdWT9Syrlnvo0o0oZYr5fIRoACoBOzTAA3AQIoUqbFys1eLAyABUDKriKVK6lLXhbnnxuJcG6dN2f1M8IV7Z4/9lP8AsynXVb6KH8HlBB6ljqq3jBmkMevrg15TPCAOvSrU6q9Er+O5ocVNxaadmu6OlhMR+NHLL88f98lHoAJiryQRsgARQAAYyVpWIW5rKOZeTJ6FHGm805N7tsqdZ4ejf9KI6aj7UQVyQdbpqPtxHTUfbiQrkg6vTUfbRPTUfbiCuSejAu2Jj5TR7umoe2iY0KUJZoQSfIK0NKa7lIxzPwbAAAAAAArKOb5LADBprcG1kUdPhgUBLjJdiLPhlQBNnwyVBvwBUtGDZZQS31LkVCVloSAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="></img>
          }
        </div>
        <NavDropdown
          id="nav-dropdown-dark-example"
          title={userData?.name}
          menuVariant="dark"
        >
          <NavDropdown.Item style={{ zIndex: "999999" }} href="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Item style={{ zIndex: "999999" }} href="/feed">Feed</NavDropdown.Item>
          <NavDropdown.Item style={{ zIndex: "999999" }} onClick={logout}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
}
