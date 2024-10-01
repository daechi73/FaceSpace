import React from "react";
import "./RenderUserClickMenu.css";
import ProfileLink from "../../sections/Profile/ProfileLink";
import { useRef, useEffect } from "react";

function RenderUserClickMenu(props) {
  const userClickMenu = useRef();

  useEffect(() => {
    console.log("inRenderUserClickMenu useEffect");
    const userClickMenuDiv = userClickMenu.current;
    userClickMenuDiv.style.top = `${props.coords[1] + 10}px`;
    userClickMenuDiv.style.left = `${props.coords[0] + 10}px`;
  }, []);

  const handleChatClick = () => {
    if (props.chatbox === null) props.setChatbox(1);
    else props.setChatbox(props.chatbox + 1);

    const chatUsers = [props.signedInUser.id, props.username];
    props.setChatUsers(chatUsers);
  };
  return (
    <div className="userClickMenu" ref={userClickMenu}>
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
