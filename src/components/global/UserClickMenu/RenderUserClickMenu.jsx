import React from "react";
import "./RenderUserClickMenu.css";
import ProfileLink from "../../sections/Profile/ProfileLink";

function RenderUserClickMenu(props) {
  const handleChatClick = () => {
    if (props.chatbox === false) props.setChatbox(true);
    const chatUsers = [props.signedInUser.id, props.username];
    props.setChatUsers(chatUsers);
  };
  return (
    <div className="userClickMenu">
      <div className="userClickMenu-chat" onClick={handleChatClick}>
        Chat
      </div>
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
