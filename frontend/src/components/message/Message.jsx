import { useState } from "react";
import "./message.css";
import { format } from "timeago.js";
import React, { useEffect} from "react";
import axios from 'axios';
import Buffer from 'buffer';

export default function Message({ message, own }) {
  console.log("messages", message);
  const [userData, setUserData] = useState([])
  useEffect(() => {
    const fetchUserdata = async() => {
      try{
        await axios.get(`http://localhost:8000/user?userId=${message?.sender}`).then((res) => {
          setUserData(res.data)
        }).catch(err => {
          console.log("error while fetching user in message.jsx", err);
        })
      }catch(err){
        console.log("error occured in message.jsx", err);
      }
    }
    fetchUserdata()
  }, [message])

  if(userData && userData?.profilePicture){
    var blob = new Blob([Int8Array.from(userData?.profilePicture?.data?.data)], {type: userData?.profilePicture?.contentType });
    var image = window.URL.createObjectURL(blob);
    console.log("final image", image);
  }

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {
          userData?.profilePicture ? 
          <img
          className="messageImg"
          src={image}
          alt=""
          /> 
          : 
          <img
          className="messageImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEx5bhTjsFgrSZ2D0q6j5XKlGpXcR6An3YxL6X1GB&s"
          alt=""
          />
        }
        
        <p className="messageText">{message.text}</p>
      </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
