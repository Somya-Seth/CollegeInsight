import React from "react";
import TextField from "@mui/material/TextField";
import "./Navbar.css";
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {AiFillHome} from "react-icons/ai"
import {BsFillChatDotsFill} from "react-icons/bs";
import { AuthContext } from '../../Context/AuthContext';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user")
    navigate('/login')
  }
  return (
    <div className="navbar">
      {/* <div className="navbar_left">
        <img
          className="srgi_logo"
          alt=""
          src="https://www.static-contents.youth4work.com/university/Documents/Colleges/CollegeImages/0ef8ef50-ae10-4791-a0d9-21b069c3aec5.png"
        />
        
      </div> */}
      <div className="college_name">SR GROUP OF INSTITUTIONS</div>
      <div className="icons">
      <AiFillHome />
      <BsFillChatDotsFill />
      </div>
      
      <div className="last">
        <div className="avatar"></div>
        <NavDropdown
              id="nav-dropdown-dark-example"
              title="John Abraham"
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
