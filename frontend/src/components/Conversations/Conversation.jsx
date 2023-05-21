import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";
// import "../../image/noAvatar.png"

export default function Conversation({ conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const PF = '';

  useEffect(() => {
    var friendId = ''
    if(conversation?.members){
      friendId = conversation?.members?.find((m) => m !== currentUser._id);
    }

    else{
      friendId = conversation?._id
    }

    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/user?userId=${friendId}`)
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  if(user && user?.profilePicture){
    var blob = new Blob([Int8Array.from(user?.profilePicture?.data?.data)], {type: user?.profilePicture?.contentType });
    var image = window.URL.createObjectURL(blob);
    console.log("final image", image);
  }

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEx5bhTjsFgrSZ2D0q6j5XKlGpXcR6An3YxL6X1GB&s"
            // : PF + 'person/noAvatar.png'
        }
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
