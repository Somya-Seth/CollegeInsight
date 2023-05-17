import './Feed2.css'
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FiEdit3 } from "react-icons/fi";
import Navbar from '../Navbar/Navbar';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import styled from "styled-components";
import PostalModal from "./PostalModal";
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CommonBox = styled.div`
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 5px;
	position: relative;
	border: none;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonBox)`
	display: flex;
	flex-direction: column;
	margin: 0 0 8px;
	color: #958b7b;
	div {
		button {
			outline: none;
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
			line-height: 1.5;
			min-height: 48px;
			display: flex;
			align-items: center;
			border: none;
			background-color: transparent;
			font-weight: 600;
		}
		&:first-child {
			display: flex;
			align-items: center;
			padding: 8px 16px;
			img {
				width: 48px;
				border-radius: 50%;
				margin-right: 8px;
			}
			button {
				margin: 4px 0;
				flex-grow: 1;
				padding-left: 16px;
				border: 1px solid rgba(0, 0, 0, 0.15);
				border-radius: 35px;
				text-align: left;
			}
		}
		&:nth-child(2) {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding-bottom: 4px;
			button {
				img {
					margin: 0 4px 0 -2px;
				}
			}
		}
	}
`;


export default function Feed2() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showSkillsModal, setShowSkillsModal] = useState(false)
    const skillsModal = () => {
        setShowSkillsModal(!showSkillsModal)
    }
    const [showModal, setShowModal] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [showDocModal, setShowDocModal] = useState(false);
    const [showSkills, setShowSkills] = useState([]);
    const [userData, setUserData] = useState("");
    const [skills, setSkills] = useState([]);
    const [newSkills, setNewSkills] = useState('');
    const [posts, setData] = useState('');
    const handleChange = e => {
        const name = e.target.value
        setNewSkills(name)
    }
    const addSkillsList = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/addSkills`, {
                body: {
                    userId: userData._id,
                    skills: skills,
                }
            });
            setShowSkills([...showSkills, ...res.data.skills])
            setShowSkillsModal(false)
            console.log(res)
        } catch (error) {
            console.error(error);
        }
    }
    const setAddSkills = e => {
        setSkills([...skills, newSkills]);
        setNewSkills('')
    };
    const clickHandler = (event) => {

        switch (showModal) {
            case true:
                setShowModal(false);
                break;
            case false:
                setShowModal(true);
                break;
            default:
                setShowModal(false);
                break;
        }
    };
    const uploadDoc = (event) => {
        switch (showDocModal) {
            case false:
                setShowDocModal(true);
                break;
            case true:
                setShowDocModal(false);
                break;
            default:
                setShowDocModal(false);
                break;
        }
    }
    const uploadPhoto = (event) => {
        switch (showPhotoModal) {
            case false:
                setShowPhotoModal(true);
                break;
            case true:
                setShowPhotoModal(false);
                break;
            default:
                setShowPhotoModal(false);
                break;
        }
    }

    useEffect(() => {
        async function getUser() {
            const email = user.email
            const getProfilePicture = await axios.get(`http://localhost:8000/profilePicture?id=${user._id}`)
            console.log("profile picture", getProfilePicture);
            const getUserData = await axios.get('http://localhost:8000/users', { params: user })
            setUserData(getUserData.data[0]);
            console.log(getUserData, userData);
            setShowSkills(getUserData.data[0].skills)
        }
        getUser()
    }, [])

    useEffect(() => {
        const getPost = async () => {
            if (userData && userData._id) {
                const getPostData = await axios.get(`http://localhost:8000/getpost?_id=${userData?._id}`)
                console.log("hello", getPostData.data)
                setData(getPostData.data)
            }
        }
        getPost()
    }, [userData]);

    return (
        <>
            <Navbar />
            <div className='feed'>
                <div className='feed_left'>
                    <div className='feed_left_top'>
                        <Card>
                            <Card.Body>
                                <div className='cover'></div>
                                <div className='main_content'>
                                    <div className='imggg'></div>
                                    <div className='fullname'>
                                        {userData?.name}
                                    </div>
                                    <div className='about_yourself'>
                                        Hello, I am a UI/UX designer. Hello, I am a UI/UX designer. My hobbies are ...
                                    </div>
                                    <Button onClick={() => { navigate('/profile') }}>Edit Profile</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='feed_left_bottom'>
                        <Card>
                            <Card.Body>
                                <div className='skillsMain'>
                                    <div>Skills</div>
                                    <br />
                                    <div className='edit_icon_summary'>
                                        <FiEdit3 onClick={skillsModal} />
                                    </div>
                                </div>
                                <div style={{ flexWrap: "wrap", display: "flex", flexDirection: "row", width: "100%", height: "20%" }} className='skills'>
                                    {
                                        showSkills && (
                                            <>
                                                {showSkills.map((item, index) => (
                                                    <p style={{ textAlign: "center", marginRight: "5%", minWidth: "35%", backgroundColor: "#dce3f9", borderRadius: "200px", border: "1px solid grey" }} key={index}>{item}</p>
                                                ))}
                                            </>
                                        )
                                    }
                                </div>
                                <div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className='feed_middle'>
                    <div className='feed_middle_top'>
                        <ShareBox>
                            <div>
                                <img src="/images/user.svg" alt="" />
                                <button onClick={clickHandler}>
                                    Start a post
                                </button>
                            </div>
                            <div>
                                <button onClick={uploadPhoto}>
                                    <img src="/images/photo-icon.svg" alt="" />
                                    <span onClick={uploadPhoto}>Photo</span>
                                </button>
                                <button onClick={uploadDoc}>
                                    <img src="/images/video-icon.svg" alt="" />
                                    <span onClick={uploadDoc}>Document</span>
                                </button>
                                <button onClick={clickHandler}>
                                    <img src="/images/article-icon.svg" alt="" />
                                    <span onClick={clickHandler}>Write article</span>
                                </button>
                            </div>
                        </ShareBox>
                    </div>
                    <div className='activity'>
                        {posts &&

                            (
                                <>
                                    {
                                        posts.map((item, index) => (
                                            <Card key={index} className='activity_card'>
                                                <div className='activity_details'>
                                                    <div className='activity_person_image'>
                                                        <img></img>
                                                    </div>
                                                    <p style={{ width: '70%', marginTop: '0.5rem' }}>{item?.userData[0]?.name}</p>
                                                    <div className='timeago__'>{item?.date}</div>
                                                </div>
                                                <div className='text__'>
                                                    {item.text}
                                                </div>
                                                {item?.image && (
                                                    <>
                                                        <div className='post_img'>
                                                            <img ></img>
                                                        </div>

                                                    </>
                                                )}
                                            </Card>
                                        ))}
                                </>
                            )
                        }

                    </div>
                </div>
                <div className='feed_right'>
                    <div className='college_glimpses'>
                        <Card></Card>
                    </div>
                    <div className='friends'>
                        Suggestions
                        <Card className='xxxx'>
                            <div className='suggestions'>
                                <div className='people_images'>
                                    <img></img>
                                </div>
                                <div>Person Name</div>
                            </div>
                            <div className='suggestions'>
                                <div className='people_images'>
                                    <img></img>
                                </div>
                                <div>Person Name</div>
                            </div>
                            <div className='suggestions'>
                                <div className='people_images'>
                                    <img></img>
                                </div>
                                <div>Person Name</div>
                            </div>
                        </Card>
                    </div>
                </div>
                <Modal show={showSkillsModal} onHide={() => setShowSkillsModal(false)}>
                    <Modal.Body className='skills_modal'>
                        <TextField label="Enter skills" onChange={handleChange} value={newSkills} type='text' fullWidth size='small' margin='dense'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button variant="outlined" onClick={setAddSkills}>Add</Button>
                                    </InputAdornment>
                                ),
                            }}>
                        </TextField>
                        {
                            skills && (
                                <>
                                    <h6>Skills:</h6>
                                    <div style={{ display: 'flex' }}>

                                        {skills.map((item, index) => (
                                            <p style={{ marginLeft: '5px' }} key={index}>{item}</p>
                                        ))}
                                    </div>
                                </>
                            )
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowSkillsModal(false)}>Close</Button>
                        <Button variant="primary" onClick={addSkillsList}>Add Skills</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <PostalModal props={[userData, showPhotoModal, showDocModal, showModal]} UserData={userData} showPhotoModal={showPhotoModal} showDocModal={showDocModal} showModal={showModal} uploadPhoto={uploadPhoto} uploadDoc={uploadDoc} clickHandler={clickHandler} />

            {/* {
            showDocModal  == true?
            <PostalModal data={'document'} /> :
            showPhotoModal == true?
            <PostalModal data={'photos'} /> :
            <PostalModal />
            } */}
        </>
    )
}
