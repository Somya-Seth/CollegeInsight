import {React, useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import "./Navbar.css";
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {AiFillHome} from "react-icons/ai"
import {BsFillChatDotsFill} from "react-icons/bs";
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

  const [userData, setUserData] = useState([])
  useEffect(() => {
    (async() => {
      await axios.get('http://localhost:8000/users', { params: user }).then(res => {
        setUserData(res.data[0])
    }).catch(err => {
      console.log("error occured in messenger", err);
    })
    })()
  }, [])

  if(userData && userData?.profilePicture){
    var blob = new Blob([Int8Array.from(userData?.profilePicture?.data?.data)], {type: userData?.profilePicture?.contentType });
    var image = window.URL.createObjectURL(blob);
    console.log("final image", image);
  }

  return (
    <div className="navbar">
      <div className="college_name">SR GROUP OF INSTITUTIONS</div>
      <div className="icons">
      <AiFillHome />
      <BsFillChatDotsFill />
      </div>
      
      <div className="last">
        <img
        className="avatar"
        src={
          userData?.profilePicture
            ? image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEx5bhTjsFgrSZ2D0q6j5XKlGpXcR6An3YxL6X1GB&s"
        }
        alt=""
      />
        <NavDropdown
              id="nav-dropdown-dark-example"
              title={userData?.name}
              menuVariant="dark"
            >
              <NavDropdown.Item  style={{ zIndex:"999999" }} href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item  style={{ zIndex:"999999" }} href="/feed">Feed</NavDropdown.Item>
              <NavDropdown.Item   style={{ zIndex:"999999" }} onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
      </div>
    </div>
  );
}
