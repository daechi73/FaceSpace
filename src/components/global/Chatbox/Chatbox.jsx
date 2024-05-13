import React from "react";
import { useState, useEffect } from "react";
import "./Chatbox.css";
import MessageApi from "./MessageApi";
import ChatboxApi from "./ChatboxApi";
import AddChatboxToUser from "./AddChatboxToUser";
import GetUpdatedUser from "./GetUpdatedUser";
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
    console.log(props.chatUsers);
    fetch(
      `http://localhost:3000/users/getChatbox/${props.chatUsers[0]}/${props.chatUsers[1]}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("here in chatbox fetch");
        console.log(res);
        if (res.status === "success") setMsgs(res.chatbox.messages);
        else setMsgs([]);
      });

    return () => {
      // socketInstant.disconnect();
    };
  }, [props.chatbox]);

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
    console.log(createMessage);
    let chatbox;
    createMessage.status === "success"
      ? (chatbox = await ChatboxApi(createMessage.message))
      : console.log(createMessage.msg);
    console.log(chatbox);
    if (chatbox.method === "created") {
      const response = await AddChatboxToUser(
        chatbox.chatbox,
        props.chatUsers[0]
      );
      console.log(response);
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
  };
  const renderMsgs = msgs.map((e, i) => {
    return (
      <div className="chatbox-msgs" key={i}>
        {e.message}
      </div>
    );
  });
  console.log("msg: " + msg);
  console.log("msgs: " + msgs);

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
