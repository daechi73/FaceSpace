import React from "react";
import { useState, useEffect } from "react";
import "./Chatbox.css";
import MessageApi from "./MessageApi";
import ChatboxApi from "./ChatboxApi";
import AddChatboxToUser from "./AddChatboxToUser";
import GetUpdatedUser from "./GetUpdatedUser";
import GetChatbox from "./GetChatbox";
import io from "socket.io-client";

function Chatbox(props) {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [socket, setSocket] = useState(null);
  console.log("here in chatbox");

  useEffect(() => {
    // const socketInstant = io.connect("http://localhost:3000");
    // setSocket(socketInstant);
    // socketInstant.on("connect", () => {
    //   console.log(`connected to server socket ${socketInstant.id}`);
    //   console.log(socketInstant);
    // });
    // socketInstant.on("testing", (data) => {
    //   alert(data);
    // });

    GetChatbox(props.chatUsers);
    return () => {
      // socketInstant.disconnect();
    };
  }, []);

  const handleMsgBoxChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSendBtn = async () => {
    //msgs.push(msg);
    // const updatedMsgs = msgs;
    // setMsg("");
    // setMsgs(updatedMsgs);
    // const req = {
    //   sender: props.chatUsers[0],
    //   receiver: props.chatUsers[1],
    //   msg: msg,a
    // };
    // const createMessage = await MessageApi(req);
    // let chatbox;
    // console.log(createMessage);
    // createMessage.status === "success"
    //   ? (chatbox = await ChatboxApi(createMessage.message))
    //   : console.log(createMessage.msg);
    // if (chatbox.method === "created") {
    //   const response = await AddChatboxToUser(
    //     chatbox.chatbox,
    //     props.chatUsers[0]
    //   );
    //   // props.setSignedInUser(response.user);
    //   // setMsgs(response.chatbox);
    //   console.log(response.chatbox);
    // } else {
    //   //const getUpdatedUser = GetUpdatedUser(props.chatUsers[0]);
    //   // props.setSignedInUser(getUpdatedUser.user);
    //   console.log("here");
    //   console.log(chatbox);
    //   //setMsgs(chatbox.messages);
    // }
    // setMsg("");
  };
  const renderMsgs = msgs.map((e, i) => {
    return (
      <div className="chatbox-msgs" key={i}>
        {e.message}
      </div>
    );
  });
  return (
    <div className="chatbox">
      <div className="chatbox-username">{props.chatUsers[1]}</div>
      <div className="chatbox-display">{renderMsgs}</div>
      <div className="chatbox-postMsg">
        <textarea
          className="chatbox-msgBox"
          name="chatbox-textMsg"
          onChange={handleMsgBoxChange}
          value={msg}
        ></textarea>
        <button className="chatbox-sendBtn" onClick={handleSendBtn}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
