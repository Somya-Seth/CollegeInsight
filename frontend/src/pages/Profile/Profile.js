import React, { useEffect, useState, useRef, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Navbar from '../../components/Navbar/Navbar'
import { AuthContext } from '../../Context/AuthContext';
import "./Profile.css";
import axios from 'axios';
import Buffer from 'buffer';

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

  for (const [i, person] of people.entries()) {
    list.push(
      <div className="suggested_people_name">
        <span className="suggested_people_profile_icon"></span>
        {person}
      </div>
    );
  }

  const [profilePicture, setImage] = useState('');
  const [postData, setpostData] = useState("");

  const inputFile = useRef(null);

  const { user } = useContext(AuthContext);

  var base64String = ''
  useEffect(() => {
    async function getUser() {
      console.log(user)
      const email= user.email
      const getUserData = await axios.get(`http://localhost:8000/profilePicture?email=${user.email}`).then(() => {
        console.log("profle picture", getUserData);
        setUserData(getUserData.data[0]);
        console.log(getUserData,UserData);
      })
      .catch((err) => {
        console.log("error ocurred in profile.js");
      })
    }
    async function getPost(){

			const getPostData = await axios.get('http://localhost:8000/getpost',{
      })
			console.log("hello", getPostData.data)
			setpostData(getPostData.data)
		}
    getPost()
    getUser()

  }, [user.email]);

  console.log("image", UserData);
  console.log("imag1", UserData?.profilePicture?.contentType);
  console.log("imag2", UserData?.profilePicture?.data?.data);
  // let image = `data:{UserData.profilePicture.contentType};base64,$(UserData.profilePicture.data.data.toString('base64'))`;
  if(UserData){
    var blob = new Blob([Int8Array.from(UserData?.profilePicture?.data?.data)], {type: UserData?.profilePicture?.contentType });
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
              <img className = 'profile_picture' src={image}></img>
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
                  {showModal ? <ProfileModal userData={UserData} showModal={props} /> : null}
                </div>
                <div className="course">{UserData.course}</div>
                <div className="year">{UserData.year}</div>
              </div>
              <div className="rating_btn">
                <Rating name="half-rating" defaultValue={2} precision={0.5} />
              </div>
            </div>
          </Card>
          <Card className="left_middle">
            <div className="summary">
              <Card.Title className="summary_heading">Summary</Card.Title>
              <div
                className="edit_icon_summary"
                onClick={() => setShowModal2(!showModal2)}
              >
                <FiEdit3  />
              </div>
            </div>
            {showModal2 ? <SummaryModal UserData={UserData} showModal2={props}></SummaryModal> : null}
            <div className="summary_text">
              {UserData.summary}
            </div>
          </Card>
          <Card className="left_bottom">
            <Card.Title className="activity_heading">Activity</Card.Title>
            <Card.Body>
              <PostCard UserData= {UserData} postData={postData} />
            </Card.Body>
          </Card>
        </div>
        <div className="right">
          <Card className="right_top">
            <div className="heading_right">Suggested People</div>
            <div>{list}</div>
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
