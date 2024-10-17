import React from "react";
import { useEffect, useState } from "react";
import "./ChatSystem.css";
import useGetChatUsers from "./useGetChatUsers";
import "./ChatSystem.css";

function ChatSystem(props) {
  console.log("HERE in ChatSystem");

  const users = useGetChatUsers(props.signedInUser._id, props.resetChatSystem);

  const renderUsers = users.map((e, i) => {
    const handleUserClick = () => {
      props.setChatUsers([props.signedInUser._id, e.user.user_name]);
      if (props.chatbox === null) {
        props.setChatbox(1);
      } else props.setChatbox(props.chatbox + 1);
      if (document.querySelector(`.newMessages.${e.user.user_name}`)) {
        document
          .querySelector(`.newMessages.${e.user.user_name}`)
          .classList.remove("newMessages");
      }

      if (
        document.querySelector(`.chatSystem-${e.user.user_name}-newMessages`)
      ) {
        if (
          document.querySelector(`.chatSystem-${e.user.user_name}-newMessages`)
            .style.display === ""
        ) {
          document.querySelector(
            `.chatSystem-${e.user.user_name}-newMessages`
          ).style.display = "none";
        }
      }
    };

    return e.new_message ? (
      <div
        className={`chatSystem-user cursor-pointer newMessages ${e.user.user_name}`}
        key={i}
        onClick={handleUserClick}
      >
        <div className="chatSystem-user-username">{e.user.user_name}</div>
        <div
          className={
            "chatSystem-user-newMessage" +
            ` chatSystem-${e.user.user_name}-newMessages`
          }
        >
          ！
        </div>
      </div>
    ) : (
      <div
        className="chatSystem-user cursor-pointer"
        key={i}
        onClick={handleUserClick}
      >
        <div className="chatSystem-user-username">{e.user.user_name}</div>
      </div>
    );
  });

  return (
    <div className="chatSystem">
      <div className="chatSystem-title">Chat</div>
      <div className="chatSystem-users">{renderUsers}</div>
    </div>
  );
}

export default ChatSystem;
