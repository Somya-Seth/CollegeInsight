import React, { useEffect, useState, useRef, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Navbar from '../../components/Navbar/Navbar'
import { AuthContext } from '../../Context/AuthContext';
import "./Profile.css";
import axios from 'axios';
import Buffer from 'buffer';
import userImage from '../../image/noAvatar.png'

import {
  AiOutlineMail,
  AiFillLinkedin,
  AiFillGithub,
  AiFillPhone,
  AiOutlineHeart,
  AiOutlineCamera,
} from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import { FiEdit3 } from "react-icons/fi";
import ProfileModal from "../../components/ProfileComponents/ProfileModal/ProfileModal";
import SummaryModal from "../../components/ProfileComponents/SummaryModal/SummaryModal";
import Rating from "@mui/material/Rating";
import PostCard from "../../components/ProfileComponents/PostCard/PostCard";

export default function Profile(props) {
  const people = [
    "Roy Rezniek",
    "James Botosh",
    "John Winston",
    "James Botosh",
    "John Winston",
  ];
  const list = [];
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [UserData, setUserData] = useState("");
  const [suggestedPeople, setSuggestedPeople] = useState([])

  for (const [i, person] of people.entries()) {
    list.push(
      <div className="suggested_people_name">
        <span className="suggested_people_profile_icon"></span>
        {person}
      </div>
    );
  }

  const [profilePicture, setImage] = useState('');
  const [postData, setpostData] = useState([]);
  const inputFile = useRef(null);
  const { user } = useContext(AuthContext);
  var base64String = ''
  useEffect(() => {
    async function getUser() {
      console.log(user);
      const email = user.email;
      try {
        const response = await axios.get(`http://localhost:8000/profilePicture?email=${email}`);
        console.log("Profile picture:", response.data[0]);
        setUserData(response.data[0]);
      } catch (err) {
        console.log("Error occurred in profile.js:", err);
      }
    }
    getUser()
  }, [user.email]);

  useEffect(()=> {
    (
      async function getSuggestedPeople() {
        try {
            const sugggestedUsers = await axios.get(`http://localhost:8000/suggestedPeople?email=${user.email}`);
            console.log("users", sugggestedUsers.data);
            setSuggestedPeople(sugggestedUsers.data)
        } catch (error) {
            console.log("error in suggestions", error.message)
        }

    }
    )()

    async function getPost() {
      const getPostData = await axios.get(`http://localhost:8000/getSelfPosts/?email=${user.email}`)
      console.log("getPost data ", getPostData)
      setpostData(getPostData.data)
    }
    getPost()
  }, [])

  async function getUser() {
    const email = user.email;
    try {
      const response = await axios.get(`http://localhost:8000/profilePicture?email=${email}`);
      console.log("Profile picture:", response.data[0]);
      setUserData(response.data[0]);
    } catch (err) {
      console.log("Error occurred in profile.js:", err);
    }
  }

  console.log("image", UserData);
  console.log("imag1", UserData?.profilePicture?.contentType);
  console.log("imag2", UserData?.profilePicture?.data?.data);

  if (UserData && UserData?.profilePicture) {
    var blob = new Blob([Int8Array.from(UserData?.profilePicture?.data?.data)], { type: UserData?.profilePicture?.contentType });
    var image = window.URL.createObjectURL(blob);
    console.log("final image", image);
  }

  const closeSummaryModal = (val) => {
    UserData.summary = val
    setShowModal2(false)
  }

  const showProfilePicture = (val) => {
    var blob = new Blob([Int8Array.from(val?.data?.data)], { type: val?.contentType });
    return window.URL.createObjectURL(blob);
   }

  const closeProfileModal = async (val, file) => {
    console.log("value", val)
    console.log("file", file)
    if (file == null) {
      UserData.profilePicture = val.profilePicture
      UserData.name = val.name
      UserData.course = val.course
      UserData.branch = val.branch
      UserData.year = val.year
      UserData.email = val.email
      UserData.linkedin = val.linkedin
      UserData.github = val.github
      UserData.languages = val.languages
      UserData.phone = val.phone
    }
    else {
      await getUser()
    }
    window.location.reload(true)
    setShowModal(false)
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
                  <Button
                    variant="outline-success"
                    className="edit_profile_btn"
                    onClick={() => setShowModal(!showModal)}
                  >
                    Edit Profile
                  </Button>
                  {showModal ? <ProfileModal getUser={getUser} userData={UserData} showModal={true} closeProfileModal={closeProfileModal} /> : null}
                </div>
                <div className="course">{UserData.course}</div>
                <div className="year">{UserData.year}</div>
              </div>
              {/* <div className="rating_btn">
                <Rating name="half-rating" defaultValue={2} precision={0.5} />
              </div> */}
            </div>
          </Card>
          <Card className="left_middle">
            <div className="summary">
              <Card.Title className="summary_heading">Summary</Card.Title>
              <div
                className="edit_icon_summary"
                onClick={() => setShowModal2(!showModal2)}
              >
                <FiEdit3 />
              </div>
            </div>
            {showModal2 ? <SummaryModal UserData={UserData} showModal2={showModal2} closeSummaryModal={closeSummaryModal}></SummaryModal> : null}
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
                    Post something to see your activity.
                </div>
                 : 
              <PostCard UserData={UserData} postData={postData} />
              }
            </Card.Body>
          </Card>
        </div>
        <div className="right">
          <Card className="right_top">
            <div className="heading_right">Suggested People</div>
            {suggestedPeople?.map((people) => {

              return <div className='suggested_people_name'>
                <div >
                  <img
                    className='suggested_people_profile_icon'
                    style={{ border: '1px solid grey', borderRadius: '50%', marginRight: '1rem' }}
                    src={
                      people?.profilePicture
                        ? showProfilePicture(people?.profilePicture)
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEx5bhTjsFgrSZ2D0q6j5XKlGpXcR6An3YxL6X1GB&s"
                    }
                    alt=""
                  />
                </div>
                <div>{people.name}</div>
              </div>
            })}
          </Card>
          <Card className="right_bottom">
            <div className="additional_details">
              <Card.Title className="additional_details_heading">
                Additional Details
              </Card.Title>
              <div className="edit_icon" onClick={() => setShowModal(!showModal)}>
                <FiEdit3 />
              </div>
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
