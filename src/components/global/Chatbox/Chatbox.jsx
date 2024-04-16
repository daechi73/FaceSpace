import React from "react";
import { useState, useEffect } from "react";
import "./Chatbox.css";
import MessageApi from "./MessageApi";
import ChatboxApi from "./ChatboxApi";
import AddChatboxToUser from "./AddChatboxToUser";
import GetUpdatedUser from "./GetUpdatedUser";

function Chatbox(props) {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const handleMsgBoxChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSendBtn = async () => {
    // msgs.push(msg);
    // const updatedMsgs = msgs;
    // setMsg("");
    // setMsgs(updatedMsgs);
    const req = {
      sender: props.chatUsers[0],
      receiver: props.chatUsers[1],
      msg: msg,
    };
    const createMessage = await MessageApi(req);
    let sendMessage;
    console.log(createMessage);
    createMessage.status === "success"
      ? (sendMessage = ChatboxApi(createMessage.message))
      : createMessage.msg;
    if (sendMessage.chatbox) {
      const response = AddChatboxToUser(
        sendMessage.chatbox,
        props.signedInUser
      );
      props.setSignedInUser(response.user);
    } else {
      const getUpdatedUser = GetUpdatedUser(props.signedInUser.id);
      props.setSignedInUser(getUpdatedUser.user);
    }
    //MessageApi(req);
    setMsg("");
  };
  const renderMsgs = msgs.map((e, i) => {
    return (
      <div className="chatbox-msgs" key={i}>
        {e}
      </div>
    );
  });
  return (
    <div className="chatbox">
      <div className="chatbox-username">{props.username}</div>
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
