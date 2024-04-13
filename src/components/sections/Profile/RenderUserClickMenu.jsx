import React from "react";
import "./RenderUserClickMenu.css";
import ProfileLink from "./ProfileLink";

function RenderUserClickMenu(props) {
  return (
    <div className="userClickMenu">
      <div className="userClickMenu-chat">Chat</div>
      <div className="userClickMenu-profile">
        <ProfileLink
          username={props.username}
          setUserProfile={props.setUserProfile}
        />
      </div>
    </div>
  );
}

export default RenderUserClickMenu;
