// import React from 'react'
// import Navbar from '../Navbar/Navbar'
// import { useEffect, useState } from "react";
// import Card from 'react-bootstrap/Card';
// import './Feed.css'
// import { IoMdPhotos } from "react-icons/io";
// import { AiFillFilePdf } from "react-icons/ai";
// import { BiText } from "react-icons/bi";
// import PostCard from './PostCard';
// import Divider from '@mui/material/Divider';
// import styled from "styled-components";
// import axios from 'axios';
// import PostalModal from "./PostalModal";
// import { useLocation } from 'react-router-dom';


// const CommonBox = styled.div`
// 	text-align: center;
// 	overflow: hidden;
// 	margin-bottom: 8px;
// 	background-color: #fff;
// 	border-radius: 5px;
// 	position: relative;
// 	border: none;
// 	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
// `;

// const ShareBox = styled(CommonBox)`
// 	display: flex;
// 	flex-direction: column;
// 	margin: 0 0 8px;
// 	color: #958b7b;
// 	div {
// 		button {
// 			outline: none;
// 			color: rgba(0, 0, 0, 0.6);
// 			font-size: 14px;
// 			line-height: 1.5;
// 			min-height: 48px;
// 			display: flex;
// 			align-items: center;
// 			border: none;
// 			background-color: transparent;
// 			font-weight: 600;
// 		}
// 		&:first-child {
// 			display: flex;
// 			align-items: center;
// 			padding: 8px 16px;
// 			img {
// 				width: 48px;
// 				border-radius: 50%;
// 				margin-right: 8px;
// 			}
// 			button {
// 				margin: 4px 0;
// 				flex-grow: 1;
// 				padding-left: 16px;
// 				border: 1px solid rgba(0, 0, 0, 0.15);
// 				border-radius: 35px;
// 				text-align: left;
// 			}
// 		}
// 		&:nth-child(2) {
// 			display: flex;
// 			flex-wrap: wrap;
// 			justify-content: space-around;
// 			padding-bottom: 4px;
// 			button {
// 				img {
// 					margin: 0 4px 0 -2px;
// 				}
// 			}
// 		}
// 	}
// `;
// const Article = styled(CommonBox)`
// 	padding: 0;
// 	margin: 0 0 8px;
// 	overflow: visible;
// `;

// const SharedActor = styled.div`
// 	padding-right: 40px;
// 	flex-wrap: nowrap;
// 	padding: 12px 16px 0;
// 	margin-bottom: 8px;
// 	display: flex;
// 	align-items: center;
// 	a {
// 		margin-right: 12px;
// 		flex-grow: 1;
// 		overflow: hidden;
// 		display: flex;
// 		img {
// 			width: 48px;
// 			height: 48px;
// 			border-radius: 50%;
// 		}
// 		& > div {
// 			display: flex;
// 			flex-direction: column;
// 			flex-grow: 1;
// 			flex-basis: 0;
// 			margin-left: 8px;
// 			overflow: hidden;
// 			span {
// 				text-align: left;
// 				&:first-child {
// 					font-size: 14px;
// 					font-weight: 700;
// 					color: #000;
// 				}
// 				&:nth-child(n + 2) {
// 					font-size: 12px;
// 					color: rgba(0, 0, 0, 0.6);
// 				}
// 			}
// 		}
// 	}
// 	button {
// 		position: absolute;
// 		top: 0;
// 		right: 12px;
// 		border: none;
// 		outline: none;
// 		background: transparent;
// 	}
// `;

// const Description = styled.div`
// 	padding: 0 16px;
// 	overflow: hidden;
// 	font-size: 14px;
// 	text-align: left;
// `;

// const SharedImage = styled.div`
// 	margin: 8px 16px 0;
// 	background-color: #f9fafb;
// 	img {
// 		width: 100%;
// 		height: 100%;
// 	}
// `;

// const SocialCount = styled.ul`
// 	line-height: 1.3;
// 	display: flex;
// 	align-items: flex-start;
// 	overflow: auto;
// 	margin: 0 16px;
// 	padding: 8px 0;
// 	border-bottom: 1px solid #e9efdf;
// 	color: rgba(0, 0, 0, 0.6);
// 	list-style: none;
// 	li {
// 		margin-right: 5px;
// 		font-size: 12px;
// 		button {
// 			display: flex;
// 			border: none;
// 			color: rgba(0, 0, 0, 0.6);
// 			background: transparent;
// 			span {
// 				padding-left: 5px;
// 			}
// 		}
// 	}
// `;

// const SocialActions = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: flex-start;
// 	margin: 4px 12px;
// 	min-height: 40px;
// 	padding-bottom: 5px;
// 	button {
// 		display: inline-flex;
// 		align-items: center;
// 		padding: 8px;
// 		border: none;
// 		background: transparent;
// 		span {
// 			margin-left: 4px;
// 			color: rgba(0, 0, 0, 0.6);
// 			font-size: 14px;
// 		}
// 	}
// 	button.active {
// 		span {
// 			color: #0a66c2;
// 			font-weight: 600;
// 		}
// 		svg {
// 			fill: #0a66c2;
// 		}
// 	}
// `;

// const Content = styled.div`
// 	text-align: center;
// 	& > img {
// 		width: 30px;
// 	}
// `;
// const Container = styled.div`
// 	grid-area: left;
//     width: 110%;
//     margin-right:50px
// `;

// const ArtCard = styled.div`
// 	text-align: center;
// 	overflow: hidden;
// 	margin-bottom: 8px;
// 	border-radius: 5px;
// 	background-color: #fff;
// 	transition: box-shadow 83ms;
// 	position: relative;
// 	border: none;
// 	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
// `;

// const UserInfo = styled.div`
// 	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
// 	padding: 12px 12px 16px;
// 	word-wrap: break-word;
// 	word-break: break-word;
// `;

// const CardBackground = styled.div`
// 	background: url("/images/card-bg.svg");
// 	background-position: center;
// 	background-size: 462px;
// 	height: 54px;
// 	margin: -12px -12px 0;
// `;

// const Photo = styled.div`
// 	box-shadow: none;
// 	background: url(${props => props.photoUrl});
// 	width: 72px;
// 	height: 72px;
// 	box-sizing: border-box;
// 	background-clip: content-box;
// 	background-color: #fff;
// 	background-position: center;
// 	/* background-size: 60%; */
// 	background-repeat: no-repeat;
// 	border: 2px solid white;
// 	margin: -38px auto 12px;
// 	border-radius: 50%;
// `;

// const Link = styled.div`
// 	font-size: 16px;
// 	line-height: 1.5;
// 	color: rgba(0, 0, 0, 0.9);
// 	font-weight: 600;
// `;

// const AddPhotoText = styled.div`
// 	color: #0a66c2;
// 	margin-top: 4px;
// 	font-size: 12px;
// 	line-height: 1.33;
// 	font-weight: 400;
// `;

// const Widget = styled.div`
// 	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
// 	padding: 12px 0;
// 	& > a {
// 		text-decoration: none;
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 		padding: 4px 12px;
// 		&:hover {
// 			background-color: rgba(0, 0, 0, 0.08);
// 		}
// 		div {
// 			display: flex;
// 			flex-direction: column;
// 			text-align: left;
// 			span {
// 				font-size: 12px;
// 				line-height: 1.333;
// 				&:first-child {
// 					color: rgba(0, 0, 0, 0.6);
// 				}
// 				&:nth-child(2) {
// 					color: #000;
// 				}
// 			}
// 		}
// 	}
// `;

// const Item = styled.a`
// 	display: block;
// 	border-color: rgba(0, 0, 0, 0.6);
// 	text-align: left;
// 	padding: 12px;
// 	font-size: 12px;
// 	span {
// 		display: flex;
// 		align-items: center;
// 	}
// 	&:hover {
// 		background-color: rgba(0, 0, 0, 0.08);
// 	}
// `;

// const CommunityCard = styled(ArtCard)`
// 	padding: 8px 0 0;
// 	text-align: left;
// 	display: flex;
// 	flex-direction: column;
// 	a {
// 		color: #000;
// 		padding: 4px 12px;
// 		font-size: 12px;
// 		&:hover {
// 			color: #0a66c2;
// 		}
// 		span {
// 			display: flex;
// 			align-items: center;
// 			justify-content: space-between;
// 		}
// 		&:last-child {
// 			color: rgba(0, 0, 0, 0.6);
// 			border-top: 1px solid #d6cec2;
// 			padding: 12px;
// 			&:hover {
// 				background-color: rgba(0, 0, 0, 0.08);
// 			}
// 		}
// 	}
// `;
// export default function Feed() {
// 	const location = useLocation();
// 	const people = ['Roy Rezniek', 'James Botosh', 'John Winston', 'James Botosh', 'John Winston'];
// 	const list = [];
// 	const [showModal, setShowModal] = useState("close");
// 	const [likeShow, setLikeComp] = useState(true);
// 	const [postData, setData] = useState([]);
// 	const [showPhotoModal, setShowPhotoModal] = useState("close");
// 	const [showDocModal, setShowDocModal] = useState("close");
// 	const [userData, setUserData] = useState([]);

	
// 	useEffect(() => {
// 		async function getPost(){

// 			const getPostData = await axios.get('http://localhost:8000/getpost')
// 			console.log("hello", getPostData.data)
// 			setData(getPostData.data)
// 		}
// 		console.log("component mounted")
// 		async function getUser(){

// 			const getUserData = await axios.get('http://localhost:8000/users', { params: location.state })
// 			setUserData(getUserData.data[0]);
// 			console.log(getUserData.data[0]);
// 		}
// 		getPost();
// 		getUser();
// 	},[]);
// 	const clickHandler = (event) => {
// 		// event.preventDefault();
// 		// if (event.target !== event.currentTarget) {
// 		// 	return;
// 		// }
// 		switch (showModal) {
// 			case "open":
// 				setShowModal("close");
// 				break;
// 			case "close":
// 				setShowModal("open");
// 				break;
// 			default:
// 				setShowModal("close");
// 				break;
// 		}
// 	};
// 	const uploadPhoto = (event) => {
// 		// event.preventDefault();
// 		// if (event.target !== event.currentTarget) {
// 		// 	return;
// 		// }
// 		switch (showPhotoModal) {
// 			case "open":
// 				setShowPhotoModal("close");
// 				break;
// 			case "close":
// 				setShowPhotoModal("open");
// 				break;
// 			default:
// 				setShowPhotoModal("close");
// 				break;
// 		}
// 	}
// 	const uploadDoc = (event) => {
// 		// event.preventDefault();
// 		// if (event.target !== event.currentTarget) {
// 		// 	return;
// 		// }
// 		switch (showDocModal) {
// 			case "open":
// 				setShowDocModal("close");
// 				break;
// 			case "close":
// 				setShowDocModal("open");
// 				break;
// 			default:
// 				setShowDocModal("close");
// 				break;
// 		}
// 	}
// 	// const getUser = async (event) => {
// 	// 	const getUserData = await axios.get('http://localhost:8000/users', { params: location.state })
// 	// 	setUserData(getUserData.data[0]);
// 	// 	console.log(getUserData.data[0]);
// 	// }
// 	const like = async (item) => {
// 		const likeTotal = item.likes + 1
// 		await axios.post('http://localhost:8000/postlike', { params: item._id }, { likes: likeTotal })
// 	}
// 	// const dislike = async (event, id) => {
// 	// 	setLikeComp(true)
// 	// 	const data = await axios.get('http://localhost:8000/getpost', { params: id })
// 	// 	const likeTotal = data.likes - 1
// 	// 	await axios.post('http://localhost:8000/postlike', { params: id }, { likes: likeTotal })
// 	// }
// 	// const getPost = async (event) => {

// 	// 	const getPostData = await axios.get('http://localhost:8000/getpost')
// 	// 	console.log("hello", getPostData.data)
// 	// 	setData(getPostData.data)
// 	// }
// 	for (const [person] of people.entries()) {
// 		list.push(<div className='chatting_people_name'>
// 			<span className='suggested_people_profile_icon feed'></span>
// 			<div className='name_msg'>
// 				{person}
// 				<div className='chat_msg'>You: Hy</div>
// 				<Divider color="grey"></Divider>
// 			</div>
// 		</div>)
// 	}
// 	return (

// 		<div>
// 			<Navbar />
// 			<div className='feed_main_page'>
// 				<div className='feed_left'>
// 					<Container>
// 						<ArtCard className='feed_left_top'>
// 							<UserInfo>
// 								<CardBackground />
// 								<a>
// 									<Photo className='profile_image_feed_page'/>
// 									<Link>Welcome, {userData.name}!</Link>
// 								</a>
// 								<a>
// 									<AddPhotoText>Add a photo</AddPhotoText>
// 								</a>
// 							</UserInfo>
// 							<Widget>
// 								About Yourself
// 							</Widget>
// 							<Item>
// 								Edit Your Profile
// 							</Item>
// 						</ArtCard>
// 						<CommunityCard>
// 							<a>
// 								<span>Groups</span>
// 							</a>
// 							<a>
// 								<span>
// 									Events
// 									<img src="/images/plus-icon.svg" alt="" />
// 								</span>
// 							</a>
// 							<a>
// 								<span>Follow Hashtags</span>
// 							</a>
// 							<a>
// 								<span>Discover More</span>
// 							</a>
// 						</CommunityCard>
// 					</Container>
// 				</div>
// 				<div className='feed_middle'>
// 					<ShareBox>
// 						<div>
// 							<img src="/images/user.svg" alt="" />
// 							<button onClick={clickHandler}>
// 								Start a post
// 							</button>
// 						</div>
// 						<div>
// 							<button>
// 								<img src="/images/photo-icon.svg" alt="" />
// 								<span onClick={uploadPhoto}>Photo</span>
// 							</button>
// 							<button onClick={uploadDoc}>
// 								<img src="/images/video-icon.svg" alt="" />
// 								<span onClick={uploadDoc}>Document</span>
// 							</button>
// 							<button onClick={clickHandler}>
// 								<img src="/images/article-icon.svg" alt="" />
// 								<span onClick={clickHandler}>Write article</span>
// 							</button>
// 						</div>
// 					</ShareBox>
// 					{postData.map((item) => (
// 						<Content key={item.id}>
// 							<Article>
// 								<SharedActor>
// 									<a>
// 										<img src="/images/user.svg" alt="" />
// 										<div>
// 											<span>{item.userData[0].name}</span>
// 											<span>{item.date}</span>
// 										</div>
// 									</a>
// 									<button>
// 										<img src="/images/ellipses.svg" alt="" />
// 									</button>
// 								</SharedActor>
// 								<Description>{item.text}</Description>
// 								<SharedImage>
// 									<a></a>
// 								</SharedImage>
// 								<SocialCount>
// 									<>
// 										<li>
// 											<button>
// 												{item.likes}<img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
// 												{/* <img src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" alt="" /> */}
// 												<span></span>
// 											</button>
// 										</li>

// 									</>
// 								</SocialCount>
// 								<SocialActions>
// 									<button>
// 										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="rgba(0, 0, 0, 0.6)" width="24" height="24" focusable="false">
// 											<path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
// 										</svg>
// 										<span onClick={() => like(item)}>Like</span>

// 									</button>
// 								</SocialActions>
// 							</Article>
// 						</Content>
// 					))}




// 				</div>
// 				<div className='feed_right'>
// 					<Card className='right_top'>
// 						<input type='search' placeholder="Search..." className='feed_heading_right' />
// 						<div>
// 							{list}
// 						</div>
// 					</Card>
// 					<div>
// 						<div></div>
// 						<div>
// 							<div></div>
// 							<div></div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<PostalModal props={[{   }, showPhotoModal, showDocModal, showModal]} userData={userData} showPhotoModal={showPhotoModal} showDocModal={showDocModal} showModal={showModal} uploadPhoto={uploadPhoto} uploadDoc={uploadDoc} clickHandler={clickHandler} />
// 		</div>
// 	)
// }
