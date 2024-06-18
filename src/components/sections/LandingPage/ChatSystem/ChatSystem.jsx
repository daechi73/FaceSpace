import React from "react";
import { useEffect, useState } from "react";
import "./ChatSystem.css";
import useGetChatUsers from "./useGetChatUsers";

function ChatSystem(props) {
  console.log("HERE in ChatSystem");
  const users = useGetChatUsers(props.signedInUser._id);

  const renderUsers = users.map((e, i) => {
    const handleUserClick = () => {
      props.setChatUsers([props.signedInUser._id, e.user_name]);
      if (props.chatbox === null) {
        props.setChatbox(1);
      } else props.setChatbox(props.chatbox + 1);
    };

    return (
      <div className="chatSystem_user" key={i} onClick={handleUserClick}>
        {e.user_name}
      </div>
    );
  });

  console.log(users);

  return (
    <div className="chatSystem">
      <div className="chatSystem_title">Chat</div>
      <div className="chatSystem_users">{renderUsers}</div>
    </div>
  );
}

export default ChatSystem;
