import React from "react";
import { useState, useEffect } from "react";
import "./Chatbox.css";

function Chatbox(props) {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const handleMsgBoxChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSendBtn = () => {
    msgs.push(msg);
    const updatedMsgs = msgs;
    setMsg("");
    setMsgs(updatedMsgs);
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
