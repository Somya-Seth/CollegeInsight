import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  console.log("messages", message);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {
          message == 'No messages yet, Start a conversation...' ? '' :
          <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
          />
        }
        
        {
          message == 'No messages yet, Start a conversation...' ? <p className="noConversationText">{message}</p> : <p className="messageText">{message.text}</p>
        }
      </div>
      {
        message == 'No messages yet, Start a conversation...' ? '' :
        <div className="messageBottom">{format(message.createdAt)}</div>
      }
    </div>
  );
}
