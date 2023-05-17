import React, { useState,useEffect } from 'react';
import ReactPlayer from "react-player";
import styled from "styled-components";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';


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
	const [editorText, setEditorText] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [editorImageText, setEditorImageText] = useState("");
	const [editorDocText, setEditorDocText] = useState("");
	const [userData, setUserData] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const location = useLocation();
	const [DocFile, setDocFile] = useState("");
	const [assetArea, setAssetArea] = useState("");
	
	let showModal = true;
	
	  const reset = (event) => {
		  setEditorText("");
		  setEditorImageText("");
		  setEditorDocText("")
		  setImageFile(null);
		  setDocFile("");
		  setAssetArea("");
		  if (props.showPhotoModal==true) {
			  
			  props.uploadPhoto(event);
			}
			
			else if (props.showDocModal==true) {
				
				props.uploadDoc(event);
			}
			else {
				props.clickHandler(event);
			}
		};
		const postArticle = async (event) => {
		  await axios.post("http://localhost:8000/post",{
			  text: editorText,
			  userId: props.UserData._id,
		  })
		  reset()
		}
		const handleImageUpload = async () => {
			var txt = ["shashank"]
			txt.push(imageFile)
		
			try {
			  const response = await axios.post("http://localhost:8000/add",{
				headers: {
					"Content-Type": "multipart/form-data"
				  },
				data: txt
			  });
		
			  setImageUrl(response.data.imageUrl);
			} catch (error) {
			  console.log(error);
			}
		  };
	function handleImage(event) {
		let image = event.target.files[0];
		if (image === "" || image === undefined) {
			alert(`Not an image. This file is: ${typeof imageFile}`);
			return;
		}
		setImageFile(image);
	}

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
								<img src="/images/user.svg" alt="" />
								<span>{props.UserData.name}</span>
							</UserInfo>
							<Editor>

								<textarea value={editorText} onChange={(event) => setEditorText(event.target.value)} placeholder="What do you want to talk about?" autoFocus={true} />

							</Editor>
						</SharedContent>
						<ShareCreation>

						<PostButton onClick={postArticle}>
							Post
						</PostButton>
						</ShareCreation>

					</Content>
				</Container>
			)}
			{props.showPhotoModal === true && (
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
								<img src="/images/user.svg" alt="" />
								<span>{props.UserData.name}</span>
							</UserInfo>
							<Editor>

								<UploadImage>
									<input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="imageFile" onChange={handleImage} style={{ display: "none" }} />
									<p>
										<label htmlFor="imageFile">Select an image to share</label>
									</p>
									<button onClick={handleImageUpload}>Upload</button>
									{imageFile && <img src={URL.createObjectURL(imageFile)} alt="" />}
								</UploadImage>
								<textarea value={editorImageText} onChange={(event) => setEditorImageText(event.target.value)} placeholder="Write a caption for your Photo" autoFocus={true} />
							</Editor>
						</SharedContent>

						<PostButton>
							Post
						</PostButton>

					</Content>
				</Container>
			)}
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
								<img src="/images/user.svg" alt="" />
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
								<textarea value={editorDocText} onChange={(event) => setEditorDocText(event.target.value)} placeholder="Write something about your document" autoFocus={true} />
							</Editor>
						</SharedContent>
						<ShareCreation>

						<PostButton>
							Post
						</PostButton>
						</ShareCreation>
					
					</Content>
				</Container>
			)}

		</>
	)
}