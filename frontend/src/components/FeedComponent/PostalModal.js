import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from "react-player";
import styled from "styled-components";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Container = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 11;
	background-color: rgba(0, 0, 0, 0.8);
	animation: fadeIn 0.3s ease;
`;

const Content = styled.div`
	width: 100%;
	max-width: 552px;
	max-height: 90%;
	background-color: #fff;
	overflow: initial;
	border-radius: 5px;
	position: relative;
	display: flex;
	flex-direction: column;
	top: 32px;
	margin: 0 auto;
`;

const Header = styled.div`
	display: block;
	padding: 10px 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	font-size: 20px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.9);
	display: flex;
	justify-content: space-between;
	align-items: center;
	h2 {
		font-weight: 400;
	}
	button {
		width: 40px;
		height: 40px;
		min-width: auto;
		border: none;
		outline: none;
		background: transparent;
		img,
		svg {
			pointer-events: none;
		}
	}
`;

const SharedContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-y: auto;
	vertical-align: baseline;
	background: transparent;
	padding: 5px 12px;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 24px;
	img {
		width: 48px;
		height: 48px;
		background-clip: content-box;
		border-radius: 50%;
		border: 2px solid transparent;
	}
	span {
		font-weight: 600;
		font-size: 16px;
		line-height: 1.5;
		margin-left: 5px;
	}
`;

const ShareCreation = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 24px 10px 16px;
`;

const AttachAsset = styled.div`
	display: flex;
	align-items: center;
`;

const AssetButton = styled.button`
	display: flex;
	align-items: center;
	height: 40px;
	min-width: auto;
	margin-right: 8px;
	border-radius: 50%;
	border: none;
	outline: none;
	justify-content: center;
	background: transparent;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

const ShareComment = styled.div`
	padding-left: 8px;
	margin-right: auto;
	border-left: 1px solid rgba(0, 0, 0, 0.08);
	${AssetButton} {
		border-radius: 50px;
		padding: 5px 10px;
		span {
			font-size: 16px;
			font-weight: 600;
			color: rgba(0, 0, 0, 0.6);
			padding: 0 5px;
		}
	}
`;

const PostButton = styled.button`
	min-width: 60px;
	padding: 0 16px;
	border-radius: 20px;
	background: "#0a66c2";
	color: "#fff";
	font-size: 16px;
	letter-spacing: 1.1px;
	border: none;
	outline: none;
	&:hover {
		background: "#004182";
	}
`;

const Editor = styled.div`
	padding: 12px 24px;
	textarea {
		width: 100%;
		min-height: 100px;
		resize: none;
	}
	input {
		width: 100%;
		height: 35px;
		font-size: 16px;
		margin-bottom: 20px;
	}
`;

const UploadImage = styled.div`
	text-align: center;
	img {
		width: 100%;
	}
`;




export default function PostModal(props) {
	const [photoModal, setShowPhotoModal] = useState(props.showPhotoModal)
	const [editorText, setEditorText] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [editorImageText, setEditorImageText] = useState("");
	const [editorDocText, setEditorDocText] = useState("");
	const [userData, setUserData] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const location = useLocation();
	const [DocFile, setDocFile] = useState("");
	const [assetArea, setAssetArea] = useState("");
	const inputFile = useRef(null)
	const [postImage, setPostImage] = useState(null);

	let showModal = true;

	
	const reset = (event) => {
		setEditorText("");
		setEditorImageText("");
		setEditorDocText("")
		setImageFile(null);
		setDocFile("");
		setAssetArea("");
		if (props.showPhotoModal == true) {

			props.uploadPhoto(event);
		}

		else if (props.showDocModal == true) {

			props.uploadDoc(event);
		}
		else {
			props.clickHandler(event);
		}
	};
	const postArticle = async (event) => {
		await axios.post("http://localhost:8000/post", {
			text: editorText,
			userId: props.UserData._id,
		})
		reset()
	}
	
	if (props.UserData && props.UserData?.profilePicture) {
		console.log("inside")
		var blob = new Blob([Int8Array.from(props.UserData?.profilePicture?.data?.data)], { type: props.UserData?.profilePicture?.contentType });
		var image = window.URL.createObjectURL(blob);
		console.log("final image", image);
	}

	const onButtonClick = () => {
		// `current` points to the mounted file input element
		inputFile.current.click();
	};

	const handleFileUpload = e => {
		const { files } = e.target;
		if (files && files.length) {
		  const filename = files[0].name;
	
		  var parts = filename.split(".");
		  const fileType = parts[parts.length - 1];
		  console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
	
		  setPostImage(files[0]);
		}
	};

	const submit = async(val) => {
		try{
			if(val == 'image'){
				
				const formData = new FormData();
				formData.append('userId', props.UserData._id)
				formData.append('text', editorImageText)
				formData.append('image', postImage)
	
				const res = await axios.post("http://localhost:8000/image", formData,
				    {
						Headers: {
							"Content-Type": "multipart/form-data"
						}
				})
				props.uploadPhoto(res)
			}
		}
		catch(err){
			console.log("error occured in postal modal", err);
		}
	}

	console.log("profile modal postimage", postImage)
	console.log("profile modal image text", editorImageText)

	return (
		<>
			{props.showModal === true && (
				<Container>
					<Content>
						<Header>
							<h2>Create a post</h2>
							<button onClick={(event) => reset(event)}>
								<img src="/images/close-icon.svg" alt="" />
							</button>
						</Header>
						<SharedContent>
							<UserInfo>
								{
									props.UserData?.profilePicture ? <img src={image} alt="no image" className='feed_middle_image'></img> : <img className='feed_middle_image' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBQQH/8QALBAAAgECBQMDAgcAAAAAAAAAAAECAxEEEiExURRBYSJTcUKxEzIzUpGSof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD7iAAAAAAAACHJLuRnQFgVzx5JTT2YEgAAAAAAAAAAAZznfRATKdttWUcm9yAVAAAAABZTaNIyTMRcK3BWEr/JYgAAAAQwK1JW0Mw9WCoAFZyywlLhNgebF4p05OnTtmW74PDKcpP1Sb+WQ2223uyCK0p1qlN3jJ/HJ0cPXVeF1o1ujlG+Ck44iK7S0YHUABUE7ao2i7q5iXpvW3JFaAAAVm7IsUqbIDMAFQIks0WuUSAOLKLhJxluiDp4rCqt6ou0/ueGWGrR3pt/GpGmR6MBDNXUu0dRTwdWT9Syrlnvo0o0oZYr5fIRoACoBOzTAA3AQIoUqbFys1eLAyABUDKriKVK6lLXhbnnxuJcG6dN2f1M8IV7Z4/9lP8AsynXVb6KH8HlBB6ljqq3jBmkMevrg15TPCAOvSrU6q9Er+O5ocVNxaadmu6OlhMR+NHLL88f98lHoAJiryQRsgARQAAYyVpWIW5rKOZeTJ6FHGm805N7tsqdZ4ejf9KI6aj7UQVyQdbpqPtxHTUfbiQrkg6vTUfbRPTUfbiCuSejAu2Jj5TR7umoe2iY0KUJZoQSfIK0NKa7lIxzPwbAAAAAAArKOb5LADBprcG1kUdPhgUBLjJdiLPhlQBNnwyVBvwBUtGDZZQS31LkVCVloSAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="></img>
								}
								<span>{props.UserData.name}</span>
							</UserInfo>
							<Editor>

								<textarea value={editorText} onChange={(event) => setEditorText(event.target.value)} placeholder="What do you want to talk about?" autoFocus={true} style={{ borderRadius: '1rem', border: '1px solid lightgrey', marginBottom: '1rem', padding: '2rem' }} />

							</Editor>
						</SharedContent>
						<ShareCreation>

							<Button onClick={postArticle} style={{ width: '6rem', height: '2rem', marginBottom: '2rem', marginLeft: '12rem' }}>
								Post
							</Button>
						</ShareCreation>

					</Content>
				</Container>
			)}
			{props.showPhotoModal === true ? (
				<Container>
					<Content>
						<Header>
							<h2>Create a post</h2>
							<button onClick={(event) => reset(event)}>
								<img src="/images/close-icon.svg" alt="" />
							</button>
						</Header>
						<SharedContent>
							<UserInfo>
								{
									props.UserData?.profilePicture ? <img src={image} alt="no image" className='feed_middle_image'></img> : <img className='feed_middle_image' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBQQH/8QALBAAAgECBQMDAgcAAAAAAAAAAAECAxEEEiExURRBYSJTcUKxEzIzUpGSof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD7iAAAAAAAACHJLuRnQFgVzx5JTT2YEgAAAAAAAAAAAZznfRATKdttWUcm9yAVAAAAABZTaNIyTMRcK3BWEr/JYgAAAAQwK1JW0Mw9WCoAFZyywlLhNgebF4p05OnTtmW74PDKcpP1Sb+WQ2223uyCK0p1qlN3jJ/HJ0cPXVeF1o1ujlG+Ck44iK7S0YHUABUE7ao2i7q5iXpvW3JFaAAAVm7IsUqbIDMAFQIks0WuUSAOLKLhJxluiDp4rCqt6ou0/ueGWGrR3pt/GpGmR6MBDNXUu0dRTwdWT9Syrlnvo0o0oZYr5fIRoACoBOzTAA3AQIoUqbFys1eLAyABUDKriKVK6lLXhbnnxuJcG6dN2f1M8IV7Z4/9lP8AsynXVb6KH8HlBB6ljqq3jBmkMevrg15TPCAOvSrU6q9Er+O5ocVNxaadmu6OlhMR+NHLL88f98lHoAJiryQRsgARQAAYyVpWIW5rKOZeTJ6FHGm805N7tsqdZ4ejf9KI6aj7UQVyQdbpqPtxHTUfbiQrkg6vTUfbRPTUfbiCuSejAu2Jj5TR7umoe2iY0KUJZoQSfIK0NKa7lIxzPwbAAAAAAArKOb5LADBprcG1kUdPhgUBLjJdiLPhlQBNnwyVBvwBUtGDZZQS31LkVCVloSAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="></img>
								}
								<span>{props.UserData.name}</span>
							</UserInfo>
							<Editor>

								<Form encType="multipart/form-data">
									<UploadImage>
										<input
											style={{ display: "none" }}
											// accept=".zip,.rar"
											ref={inputFile}
											onChange={handleFileUpload}
											type="file"
										/>
										<Button onClick={onButtonClick} style={{ border: 'none', marginBottom: '1rem', color: '#0073b1', backgroundColor: '#fff', width: 'auto', height: '2rem' }}>Select an image to share</Button>
										{/* {inputFile ? <div>{inputFile}</div> : ''} */}
									</UploadImage>
									<textarea value={editorImageText} onChange={(event) => setEditorImageText(event.target.value)} placeholder="Write a caption for your image" autoFocus={true} style={{ borderRadius: '1rem', border: '1px solid lightgrey', marginBottom: '1rem', padding: '2rem' }} />
								</Form>
							</Editor>
						</SharedContent>

						<Button style={{ width: '6rem', height: '2rem', marginBottom: '2rem', marginLeft: '15rem' }} onClick={() => submit('image')}>
							Post
						</Button>

					</Content>
				</Container>
			): ''}
			{props.showDocModal === true && (
				<Container>
					<Content>
						<Header>
							<h2>Create a post</h2>
							<button onClick={(event) => reset(event)}>
								<img src="/images/close-icon.svg" alt="" />
							</button>
						</Header>
						<SharedContent>
							<UserInfo>
								{
									props.UserData?.profilePicture ? <img src={image} alt="no image" className='feed_middle_image'></img> : <img className='feed_middle_image' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBQQH/8QALBAAAgECBQMDAgcAAAAAAAAAAAECAxEEEiExURRBYSJTcUKxEzIzUpGSof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD7iAAAAAAAACHJLuRnQFgVzx5JTT2YEgAAAAAAAAAAAZznfRATKdttWUcm9yAVAAAAABZTaNIyTMRcK3BWEr/JYgAAAAQwK1JW0Mw9WCoAFZyywlLhNgebF4p05OnTtmW74PDKcpP1Sb+WQ2223uyCK0p1qlN3jJ/HJ0cPXVeF1o1ujlG+Ck44iK7S0YHUABUE7ao2i7q5iXpvW3JFaAAAVm7IsUqbIDMAFQIks0WuUSAOLKLhJxluiDp4rCqt6ou0/ueGWGrR3pt/GpGmR6MBDNXUu0dRTwdWT9Syrlnvo0o0oZYr5fIRoACoBOzTAA3AQIoUqbFys1eLAyABUDKriKVK6lLXhbnnxuJcG6dN2f1M8IV7Z4/9lP8AsynXVb6KH8HlBB6ljqq3jBmkMevrg15TPCAOvSrU6q9Er+O5ocVNxaadmu6OlhMR+NHLL88f98lHoAJiryQRsgARQAAYyVpWIW5rKOZeTJ6FHGm805N7tsqdZ4ejf9KI6aj7UQVyQdbpqPtxHTUfbiQrkg6vTUfbRPTUfbiCuSejAu2Jj5TR7umoe2iY0KUJZoQSfIK0NKa7lIxzPwbAAAAAAArKOb5LADBprcG1kUdPhgUBLjJdiLPhlQBNnwyVBvwBUtGDZZQS31LkVCVloSAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="></img>
								}
								<span>{props.UserData.name}</span>
							</UserInfo>
							<Editor>
								<input
									type="File"
									name="Document"
									id="DocFile"
									value={DocFile}
									placeholder="Upload the Document"
									onChange={(event) => setDocFile(event.target.value)}
								/>
								<textarea value={editorDocText} onChange={(event) => setEditorDocText(event.target.value)} placeholder="Write something about your document" autoFocus={true} style={{ borderRadius: '1rem', border: '1px solid lightgrey', marginBottom: '1rem', padding: '2rem' }} />
							</Editor>
						</SharedContent>
						<ShareCreation>

							<Button style={{ marginBottom: '2rem', marginLeft: '14rem' }}>
								Post
							</Button>
						</ShareCreation>

					</Content>
				</Container>
			)}

		</>
	)
}