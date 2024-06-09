import React from "react";
import { useEffect, useState } from "react";
import "./ChatSystem.css";
import useGetChatUsers from "./useGetChatUsers";

function ChatSystem(props) {
  console.log("HERE in ChatSystem");
  const users = useGetChatUsers(props.signedInUser._id);

  const renderUsers = users.map((e, i) => {
    return (
      <div className="chatSystem_user" key={i}>
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
