import React, { useEffect, useState, useRef, useContext } from "react";
import Card from "react-bootstrap/Card";
import Navbar from '../../components/Navbar/Navbar'
import { AuthContext } from '../../Context/AuthContext';
import "./Profile.css";
import axios from 'axios';

import {
  AiOutlineMail,
  AiFillLinkedin,
  AiFillGithub,
  AiFillPhone,
  AiOutlineHeart,
} from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import PostCard from "../../components/ProfileComponents/PostCard/PostCard";
import { useLocation } from "react-router-dom";

export default function Profile(props) {
  const location = useLocation();
  const [UserData, setUserData] = useState(location.state);
  const [postData, setpostData] = useState([]);

  useEffect(()=> {
    async function getPost() {
      const getPostData = await axios.get(`http://localhost:8000/getSelfPosts/?email=${UserData.email}`)
      console.log("getPost data ", getPostData)
      setpostData(getPostData.data)
    }
    getPost()
  }, [])

  console.log("image", UserData);
  console.log("imag1", UserData?.profilePicture?.contentType);
  console.log("imag2", UserData?.profilePicture?.data?.data);

  if (UserData && UserData?.profilePicture) {
    var blob = new Blob([Int8Array.from(UserData?.profilePicture?.data?.data)], { type: UserData?.profilePicture?.contentType });
    var image = window.URL.createObjectURL(blob);
    console.log("final image", image);
  }

  return (
    <>
      <Navbar />
      <div className="profile_root">
        <div className="left">
          <Card className="left_top">
            <div className="upper_background"></div>
            <div className="profile_image">
              {UserData?.profilePicture ?
                <img className='profile_picture' src={image} alt=""></img> :
                <img className='profile_picture' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBQQH/8QALBAAAgECBQMDAgcAAAAAAAAAAAECAxEEEiExURRBYSJTcUKxEzIzUpGSof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD7iAAAAAAAACHJLuRnQFgVzx5JTT2YEgAAAAAAAAAAAZznfRATKdttWUcm9yAVAAAAABZTaNIyTMRcK3BWEr/JYgAAAAQwK1JW0Mw9WCoAFZyywlLhNgebF4p05OnTtmW74PDKcpP1Sb+WQ2223uyCK0p1qlN3jJ/HJ0cPXVeF1o1ujlG+Ck44iK7S0YHUABUE7ao2i7q5iXpvW3JFaAAAVm7IsUqbIDMAFQIks0WuUSAOLKLhJxluiDp4rCqt6ou0/ueGWGrR3pt/GpGmR6MBDNXUu0dRTwdWT9Syrlnvo0o0oZYr5fIRoACoBOzTAA3AQIoUqbFys1eLAyABUDKriKVK6lLXhbnnxuJcG6dN2f1M8IV7Z4/9lP8AsynXVb6KH8HlBB6ljqq3jBmkMevrg15TPCAOvSrU6q9Er+O5ocVNxaadmu6OlhMR+NHLL88f98lHoAJiryQRsgARQAAYyVpWIW5rKOZeTJ6FHGm805N7tsqdZ4ejf9KI6aj7UQVyQdbpqPtxHTUfbiQrkg6vTUfbRPTUfbiCuSejAu2Jj5TR7umoe2iY0KUJZoQSfIK0NKa7lIxzPwbAAAAAAArKOb5LADBprcG1kUdPhgUBLjJdiLPhlQBNnwyVBvwBUtGDZZQS31LkVCVloSAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=" alt=""></img>
              } 
            </div>
            <div className="lower_background">
              <div className="imp_details">
                <div className="user_name">
                  {UserData.name}
                </div>
                <div className="course">{UserData?.course}</div>
                <div className="year">{UserData?.year}</div>
              </div>
            </div>
          </Card>
          <Card className="left_middle">
            <div className="summary">
              <Card.Title className="summary_heading">Summary</Card.Title>
            </div>
            <div className="summary_text">
              {UserData.summary}
            </div>
          </Card>
          <Card className="left_bottom">
            <Card.Title className="activity_heading">Activity</Card.Title>
            <Card.Body>
              {
                postData.length == 0 ?
                <div className='no_post_text'>
                    User has not posted anything till now.
                </div>
                 : 
                <PostCard UserData={UserData} postData={postData} />
              }
            </Card.Body>
          </Card>
        </div>
        <div className="right">
          <Card className="right_bottom">
            <div className="additional_details">
              <Card.Title className="additional_details_heading">
                Additional Details
              </Card.Title>
            </div>

            <div>
              <AiOutlineMail />
              <span className="text_">Email</span>{" "}
              <div className="inner_text">{UserData.email}</div>
            </div>
            <div>
              <AiFillLinkedin />
              <span className="text_">Linkedin</span>{" "}
              <div className="inner_text">{UserData.linkedin}</div>
            </div>
            <div>
              <AiFillGithub />
              <span className="text_">Github</span>{" "}
              <div className="inner_text">{UserData.github}</div>
            </div>
            <div>
              <AiFillPhone />
              <span className="text_">Phone</span>{" "}
              <div className="inner_text">{UserData.phone}</div>
            </div>
            <div>
              <GrLanguage />
              <span className="text_">Languages</span>{" "}
              <div className="inner_text">{UserData.languages}</div>
            </div>
            <div>
              <AiOutlineHeart />
              <span className="text_">Preferred Pronounce</span>{" "}
              <div className="inner_text">{UserData.preferredGenderPronounce}</div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
