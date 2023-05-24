import './Feed2.css'
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FiEdit3 } from "react-icons/fi";
import Navbar from '../Navbar/Navbar';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState, useContext, useRef } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import styled from "styled-components";
import PostalModal from "./PostalModal";
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import Table from 'react-bootstrap/Table';
import SweetAlert from 'react-bootstrap-sweetalert'
import ControlledCarousel from '../Carousel/Carousel';
import swal from "sweetalert";
import { Document, Page } from 'react-pdf';

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
    const [recentlyPosted, setRecentlyPosted] = useState('')
    const [showBlockModal, setShowBlockModal] = useState(false)
    const [allStudents, setAllStudents] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [student, setStudent] = useState('');
    const [suggestedPeople, setSuggestedPeople] = useState([])
    const [summary, setSummary] = useState("")

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
            setShowSkills([...res.data.skills])
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
        if (event && event.data && (event.data.img || event.data.text)) {
            swal(
                "Post Uploaded Successfully",
                "",
                "success"
            );
        }
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
    if (userData && userData?.profilePicture) {
        console.log("inside")
        var blob = new Blob([Int8Array.from(userData?.profilePicture?.data?.data)], { type: userData?.profilePicture?.contentType });
        var image = window.URL.createObjectURL(blob);
        console.log("final image", image);
    }

    useEffect(() => {
        async function getSummary(){
            try{
               const summary =  await axios.get(`http://localhost:8000/getSummary?email=${user.email}`);
               console.log("res summary",summary.data)
               setSummary(summary.data)
            }catch(error){
                console.log("error in getSumamry", error.message)
            }
        }
        async function getSuggestedPeople() {
            try {
                const sugggestedUsers = await axios.get(`http://localhost:8000/suggestedPeople?email=${user.email}`);
                console.log("users", sugggestedUsers.data);
                setSuggestedPeople(sugggestedUsers.data)
            } catch (error) {
                console.log("error in suggestions", error.message)
            }

        }
        async function getUser() {
            const email = user.email
            const getProfilePicture = await axios.get(`http://localhost:8000/profilePicture?id=${user._id}`)
            console.log("profile picture", getProfilePicture);
            const getUserData = await axios.get('http://localhost:8000/users', { params: user })
            setUserData(getUserData.data[0]);
            console.log(getUserData, userData);
            setShowSkills(getUserData.data[0].skills)
            setSkills(getUserData.data[0].skills)
        }
        getUser()
        getSummary()
        getSuggestedPeople()
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

    console.log('recentlyPosted', recentlyPosted);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const blockModalClicked = async () => {
        setShowBlockModal(!showBlockModal)
        await axios.get(`http://localhost:8000/allStudents/?email=${user.email}&role=${userData?.role}`).then(res => {
            setAllStudents(res.data)
        }).catch(err => {
            console.log('error while fetching all students', err)
        })
    }

    const blockStudent = async () => {
        setShowAlert(!showAlert)
        await axios.get(`http://localhost:8000/blockStudent/?userId=${student?._id}`).then(res => {
        }).catch(err => {
            console.log("error occured while blocking a student");
        })
    }

    const showProfilePicture = (val) => {
        var blob = new Blob([Int8Array.from(val?.data?.data)], { type: val?.contentType });
        return window.URL.createObjectURL(blob);
    }

    const showImg = (val) => {
        var blob = new Blob([Int8Array.from(val?.data?.data)], { type: val?.contentType });
        return window.URL.createObjectURL(blob);
    }

    const blockAStudent = (stud) => {
        if (stud?._isBlocked) {
            return
        }
        setShowAlert(!showAlert)
        setStudent(stud)
    }

    console.log("suggested", suggestedPeople)


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
                                    <div className='imggg'>
                                        {
                                            userData.profilePicture ? <img src={showProfilePicture(userData?.profilePicture)} alt="no image"></img> : <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBQQH/8QALBAAAgECBQMDAgcAAAAAAAAAAAECAxEEEiExURRBYSJTcUKxEzIzUpGSof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD7iAAAAAAAACHJLuRnQFgVzx5JTT2YEgAAAAAAAAAAAZznfRATKdttWUcm9yAVAAAAABZTaNIyTMRcK3BWEr/JYgAAAAQwK1JW0Mw9WCoAFZyywlLhNgebF4p05OnTtmW74PDKcpP1Sb+WQ2223uyCK0p1qlN3jJ/HJ0cPXVeF1o1ujlG+Ck44iK7S0YHUABUE7ao2i7q5iXpvW3JFaAAAVm7IsUqbIDMAFQIks0WuUSAOLKLhJxluiDp4rCqt6ou0/ueGWGrR3pt/GpGmR6MBDNXUu0dRTwdWT9Syrlnvo0o0oZYr5fIRoACoBOzTAA3AQIoUqbFys1eLAyABUDKriKVK6lLXhbnnxuJcG6dN2f1M8IV7Z4/9lP8AsynXVb6KH8HlBB6ljqq3jBmkMevrg15TPCAOvSrU6q9Er+O5ocVNxaadmu6OlhMR+NHLL88f98lHoAJiryQRsgARQAAYyVpWIW5rKOZeTJ6FHGm805N7tsqdZ4ejf9KI6aj7UQVyQdbpqPtxHTUfbiQrkg6vTUfbRPTUfbiCuSejAu2Jj5TR7umoe2iY0KUJZoQSfIK0NKa7lIxzPwbAAAAAAArKOb5LADBprcG1kUdPhgUBLjJdiLPhlQBNnwyVBvwBUtGDZZQS31LkVCVloSAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="></img>
                                        }

                                    </div>
                                    <div className='fullname'>
                                        {userData?.name}
                                    </div>
                                    <div className='about_yourself'>
                                        {summary}
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
                                {
                                    userData?.profilePicture ? <img src={image} alt="no image" className='feed_middle_image'></img> : <img className='feed_middle_image' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBQQH/8QALBAAAgECBQMDAgcAAAAAAAAAAAECAxEEEiExURRBYSJTcUKxEzIzUpGSof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD7iAAAAAAAACHJLuRnQFgVzx5JTT2YEgAAAAAAAAAAAZznfRATKdttWUcm9yAVAAAAABZTaNIyTMRcK3BWEr/JYgAAAAQwK1JW0Mw9WCoAFZyywlLhNgebF4p05OnTtmW74PDKcpP1Sb+WQ2223uyCK0p1qlN3jJ/HJ0cPXVeF1o1ujlG+Ck44iK7S0YHUABUE7ao2i7q5iXpvW3JFaAAAVm7IsUqbIDMAFQIks0WuUSAOLKLhJxluiDp4rCqt6ou0/ueGWGrR3pt/GpGmR6MBDNXUu0dRTwdWT9Syrlnvo0o0oZYr5fIRoACoBOzTAA3AQIoUqbFys1eLAyABUDKriKVK6lLXhbnnxuJcG6dN2f1M8IV7Z4/9lP8AsynXVb6KH8HlBB6ljqq3jBmkMevrg15TPCAOvSrU6q9Er+O5ocVNxaadmu6OlhMR+NHLL88f98lHoAJiryQRsgARQAAYyVpWIW5rKOZeTJ6FHGm805N7tsqdZ4ejf9KI6aj7UQVyQdbpqPtxHTUfbiQrkg6vTUfbRPTUfbiCuSejAu2Jj5TR7umoe2iY0KUJZoQSfIK0NKa7lIxzPwbAAAAAAArKOb5LADBprcG1kUdPhgUBLjJdiLPhlQBNnwyVBvwBUtGDZZQS31LkVCVloSAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="></img>
                                }
                                <button onClick={clickHandler}>
                                    Start a post
                                </button>
                            </div>
                            <div>
                                <button onClick={uploadPhoto}>
                                    <img src="/images/photo-icon.svg" alt="" />
                                    <span onClick={uploadPhoto}>Photo</span>
                                </button>
                                {/* <button onClick={uploadDoc}>
                                    <img src="/images/video-icon.svg" alt="" />
                                    <span onClick={uploadDoc}>Document</span>
                                </button> */}
                                <button onClick={clickHandler}>
                                    <img src="/images/article-icon.svg" alt="" />
                                    <span onClick={clickHandler}>Write article</span>
                                </button>
                            </div>
                        </ShareBox>
                    </div>
                    <div>
                        {
                            posts.length == 0 &&
                            (<>
                                {
                                    <Card className='activity_card_nopost' style={{ height: '28rem' }}>
                                        <div className='no_post_text'>
                                            No Posts Yet. Start a post above..
                                        </div>
                                    </Card>
                                }
                            </>)
                        }
                        {posts.length > 0 &&

                            (
                                <div className='activity'>
                                    {
                                        posts.map((item, index) => (
                                            <Card key={index} className='activity_card'>
                                                <div className='activity_details'>
                                                    <div>
                                                        <img src={
                                                            item?.userData[0]?.profilePicture ? showProfilePicture(item?.userData[0]?.profilePicture) :
                                                                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBQQH/8QALBAAAgECBQMDAgcAAAAAAAAAAAECAxEEEiExURRBYSJTcUKxEzIzUpGSof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD7iAAAAAAAACHJLuRnQFgVzx5JTT2YEgAAAAAAAAAAAZznfRATKdttWUcm9yAVAAAAABZTaNIyTMRcK3BWEr/JYgAAAAQwK1JW0Mw9WCoAFZyywlLhNgebF4p05OnTtmW74PDKcpP1Sb+WQ2223uyCK0p1qlN3jJ/HJ0cPXVeF1o1ujlG+Ck44iK7S0YHUABUE7ao2i7q5iXpvW3JFaAAAVm7IsUqbIDMAFQIks0WuUSAOLKLhJxluiDp4rCqt6ou0/ueGWGrR3pt/GpGmR6MBDNXUu0dRTwdWT9Syrlnvo0o0oZYr5fIRoACoBOzTAA3AQIoUqbFys1eLAyABUDKriKVK6lLXhbnnxuJcG6dN2f1M8IV7Z4/9lP8AsynXVb6KH8HlBB6ljqq3jBmkMevrg15TPCAOvSrU6q9Er+O5ocVNxaadmu6OlhMR+NHLL88f98lHoAJiryQRsgARQAAYyVpWIW5rKOZeTJ6FHGm805N7tsqdZ4ejf9KI6aj7UQVyQdbpqPtxHTUfbiQrkg6vTUfbRPTUfbiCuSejAu2Jj5TR7umoe2iY0KUJZoQSfIK0NKa7lIxzPwbAAAAAAArKOb5LADBprcG1kUdPhgUBLjJdiLPhlQBNnwyVBvwBUtGDZZQS31LkVCVloSAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="
                                                        }
                                                            className='post_image'></img>
                                                    </div>
                                                    <p style={{ width: '70%', marginTop: '0.5rem' }}>{item?.userData[0]?.name}</p>
                                                    <div className='timeago__'>{format(item?.date)}</div>
                                                </div>
                                                <div className='text__'>
                                                    {item.text}
                                                </div>
                                                {item?.img && (
                                                    <>
                                                        <div className='post_img__'>
                                                            <img className='post_img' src={showImg(item.img)}></img>
                                                        </div>

                                                    </>
                                                )}
                                               
                                </Card>
                            ))}
                                </div>
                            )
                            
                        }

                </div>
            </div>
            <div className='feed_right'>
                <div className='college_glimpses'>
                    <div className='heading__text'>Some College Glimpses:-</div>
                    <Card className='college_glimpses'>
                        <ControlledCarousel />
                    </Card>
                </div>
                {
                    userData?.role == 'TEACHER' ?
                        <a className='block_text' onClick={blockModalClicked}>Do you want to block a student?</a> : ' '
                }
                <div className='heading__text'>
                    Suggestions:-
                    <Card className='xxxx'>
                        {suggestedPeople?.map((people) => {

                            return <div className='suggestions'>
                                <div >
                                    <img
                                        className='people_images'
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
            <Modal show={showBlockModal} onHide={() => setShowBlockModal(false)} centered>
                <Modal.Body className='skills_modal'>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allStudents?.map(st => {
                                    return <tr>
                                        <td>
                                            <img
                                                style={{ border: '1px solid grey', borderRadius: '50%', width: '1rem', height: '1rem', marginRight: '1rem' }}
                                                src={
                                                    st?.profilePicture
                                                        ? showProfilePicture(st?.profilePicture)
                                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEx5bhTjsFgrSZ2D0q6j5XKlGpXcR6An3YxL6X1GB&s"
                                                }
                                                alt=""
                                            />
                                            {st?.name}
                                        </td>
                                        <td style={{ cursor: 'pointer' }}>
                                            <div onClick={() => blockAStudent(st)}>
                                                {st?.isBlocked ? 'Blocked' : 'Block'}
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                        {
                            showAlert ?
                                <SweetAlert
                                    warning
                                    // showCancel
                                    confirmBtnText="Yes, block it!"
                                    confirmBtnBsStyle="danger"
                                    title="Are you sure?"
                                    onConfirm={blockStudent}
                                    // onCancel={}
                                    focusCancelBtn
                                >
                                    This student will not be able to login again.
                                </SweetAlert> : ' '
                        }

                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBlockModal(false)}>Close</Button>
                    <Button variant="primary" onClick={() => setShowBlockModal(false)}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </div >
            <PostalModal props={[userData, showPhotoModal, showDocModal, showModal]} UserData={userData} showPhotoModal={showPhotoModal} showDocModal={showDocModal} showModal={showModal} uploadPhoto={uploadPhoto} uploadDoc={uploadDoc} clickHandler={clickHandler} recentlyPosted={recentlyPosted} />

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
