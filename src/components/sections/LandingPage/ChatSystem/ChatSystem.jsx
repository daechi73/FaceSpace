import React from "react";
import { useEffect, useState } from "react";
import "./ChatSystem.css";
import useGetChatUsers from "./useGetChatUsers";
import "./ChatSystem.css";

function ChatSystem(props) {
  console.log("HERE in ChatSystem");
  const users = useGetChatUsers(props.signedInUser._id);
  console.log("heree1");
  console.log(users);

  const renderUsers = users.map((e, i) => {
    const handleUserClick = () => {
      props.setChatUsers([props.signedInUser._id, e.user.user_name]);
      if (props.chatbox === null) {
        props.setChatbox(1);
      } else props.setChatbox(props.chatbox + 1);
    };

    return (
      <div
        className={
          e.new_message ? "chatSystem_user newMessages" : "chatSystem_user"
        }
        key={i}
        onClick={handleUserClick}
      >
        {e.user.user_name}
      </div>
    );
  });

  console.log(users);

  return (
    <div className="chatSystem">
      <div className="chatSystem-title">Chat</div>
      <div className="chatSystem-users">{renderUsers}</div>
    </div>
  );
}

export default ChatSystem;
