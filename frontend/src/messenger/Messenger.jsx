import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../src/components/Conversations/Conversation";
import Message from "../../src/components/message/Message";
import ChatOnline from "../../src/components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../src/Context/AuthContext";
import axios from "axios";
import Navbar from '../components/Navbar/Navbar'
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchParam] = useState(["name"]);
  const [usersList, setUsersList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(()=>{
    (async() => {
      await axios.get('http://localhost:8000/users', { params: user }).then(res => {
        setUserData(res.data[0])
    }).catch(err => {
      console.log("error occured in messenger", err);
    })
    await axios.get('http://localhost:8000/allUsers', {params: user}).then(res => {
      setAllUsers(res.data)
    }).catch(err => {
      console.log('error occured while getting all users in frontend', err)
    })
    })()
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userData._id);
    // socket.current.on("getUsers", (users) => {
    //   // setOnlineUsers(
    //   //   user.followings.filter((f) => users.some((u) => u.userId === f))
    //   // );
    // });
  }, [userData]);


  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8000/conversations/" + userData._id);
        setConversations(res.data);
        setUsersList(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userData._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userData._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    // const receiverId = currentChat?.members?.find(
    //   (member) => member !== userData._id
    // );

    // socket.current.emit("sendMessage", {
    //   senderId: userData._id,
    //   receiverId,
    //   text: newMessage,
    // });

    try {
      const res = await axios.post("http://localhost:8000/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const searchUsers = (e) => {
    setSearchQuery(e.target.value)
    if(e.target.value == ''){
      setConversations(usersList)
      return
    }
    const arr =  allUsers.filter((item) => {
      return searchParam.some((newItem) => {
          return (
              item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(e.target.value.toLowerCase()) > -1
          );
      });
    });
    setConversations([...arr])
  }

  return (
    <>
     <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" onChange={searchUsers}/>
            {
            conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userData} />
              </div>
            ))
            }
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === userData._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={userData._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
