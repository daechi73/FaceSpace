import React from "react";
import { useState } from "react";
import "./LandingPage.css";
import Posts from "../sections/LandingPage/Posts/Posts";
import People from "../sections/LandingPage/People/People.jsx";
import Chatbox from "../global/Chatbox/Chatbox.jsx";
import ChatSystem from "../global/ChatSystem/ChatSystem.jsx";

function LandingPage(props) {
  console.log("here in landingPage");

  return (
    <div className="landingPage">
      <ChatSystem
        signedInUser={props.signedInUser}
        setChatUsers={props.setChatUsers}
        setChatbox={props.setChatbox}
        chatbox={props.chatbox}
        resetChatSystem={props.resetChatSystem}
      />

      <Posts signedInUser={props.signedInUser} />
      <People
        signedInUser={props.signedInUser}
        setSignedInUser={props.setSignedInUser}
        setUserProfile={props.setUserProfile}
        people={props.people}
        setPeople={props.setPeople}
        chatbox={props.chatbox}
        setChatbox={props.setChatbox}
        chatUsers={props.chatUsers}
        setChatUsers={props.setChatUsers}
      />

      {props.chatbox ? (
        <Chatbox
          chatUsers={props.chatUsers}
          setSignedInUser={props.setSignedInUser}
          chatbox={props.chatbox}
          setChatbox={props.setChatbox}
          signedInUser={props.signedInUser}
          setResetChatSystem={props.setResetChatSystem}
          resetChatSystem={props.resetChatSystem}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default LandingPage;
