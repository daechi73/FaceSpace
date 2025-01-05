import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import MessageApi from "./MessageApi";
import ChatboxApi from "./ChatboxApi";
import AddChatboxToUser from "./AddChatboxToUser";
import useRemoveChatboxNewMessage from "../ChatSystem/useRemoveChatboxNewMessage";

function Chatbox(props) {
  console.log("here in chatbox");

  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [chatboxId, setChatboxId] = useState(null);

  let displayRef = useRef(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API}users/getChatbox/${props.chatUsers[0]}/${
        props.chatUsers[1]
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("here in chatbox fetch");
        if (res.status === "success") {
          setMsgs(res.chatbox.messages);
          //resets changes in chatboxID will change said chatbox's new_message into ""
          if (
            res.chatbox.new_message !== "" &&
            res.chatbox.new_message !== props.signedInUser.user_name
          ) {
            setChatboxId(res.chatbox._id);
          }
          //console.log(res.chatbox.messages[res.chatbox.messages.length - 1]);
        } else setMsgs([]);
      });

    return () => {
      socketInstant.disconnect();
    };
  }, [props.chatbox]);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollTo(0, 1000);
    }
  });

  useRemoveChatboxNewMessage({ chatboxId: chatboxId });

  const handleMsgBoxChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSendBtn = async () => {
    //##basic concept
    // let newMsgs = msgs;
    // newMsgs.push(msg);
    // console.log(newMsgs);
    // setMsgs(newMsgs);
    //
    //##Real Implementation

    const req = {
      sender: props.chatUsers[0],
      receiver: props.chatUsers[1],
      msg: msg,
    };

    const createMessage = await MessageApi(req);
    let chatbox;
    createMessage.status === "success"
      ? (chatbox = await ChatboxApi(createMessage.message))
      : console.log(createMessage.msg);
    if (chatbox.method === "created") {
      const response = await AddChatboxToUser(
        chatbox.chatbox,
        props.chatUsers[0]
      );
      // props.setSignedInUser(response.user);
      setMsgs(response.chatbox.messages);
      // console.log(response.chatbox);
    } else {
      //const getUpdatedUser = GetUpdatedUser(props.chatUsers[0]);
      // props.setSignedInUser(getUpdatedUser.user);
      // console.log("finalStage");
      // console.log(chatbox.chatbox.messages);
      setMsgs(chatbox.chatbox.messages);
    }
    setMsg("");
    const resetChatSystem = (resetChatSystem, setResetChatSystem) => {
      if (resetChatSystem === null) return setResetChatSystem(1);
      else return setResetChatSystem(resetChatSystem + 1);
    };
    resetChatSystem(props.resetChatSystem, props.setResetChatSystem);
  };
  const renderMsgs = msgs.map((e, i) => {
    return (
      <div className="chatbox-msgs" key={i}>
        {e.message}
      </div>
    );
  });

  const handleCloseBtn = () => {
    props.setChatbox(null);
  };

  // console.log(displayRef.current);
  // console.log("msg: " + msg);
  // console.log("msgs: " + msgs);

  return (
    <div className="chatbox">
      <div className="chatbox-closeBtn-container">
        <div className="chatbox-closeBtn" onClick={handleCloseBtn}>
          x
        </div>
      </div>
      <div className="chatbox-username">{props.chatUsers[1]}</div>
      <div className="chatbox-display" ref={displayRef}>
        {renderMsgs}
      </div>
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
