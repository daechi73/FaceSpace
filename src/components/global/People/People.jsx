import React from "react";
import { useEffect, useState } from "react";
import "./People.css";
import RenderUsers from "./RenderUsersUtilify/RenderUsers";
import RenderFriends from "./RenderUsersUtilify/RenderFriends";
import RenderFriendReq from "./RenderUsersUtilify/RenderFriendReq";

/*
props: signedInUser
       setSignedInUser
       setUserProfile
       people
       setPeople
       chatbox
       setChatbox
       chatUsers
       setchatUsers
       renderUsers
       renderFriends
       renderFriendReq
*/
function People(props) {
  console.log("here in people");
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuUsername, setShowMenuUsername] = useState("");
  useEffect(() => {
    const removeMenu = (e) => {
      if (e.target.classList.contains(!"renderUsers-user-user-username"))
        setShowMenu(false);
    };
    window.addEventListener("click", removeMenu);
    return () => {
      window.removeEventListener("click", removeMenu);
    };
  });
  useEffect(() => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: props.signedInUser }),
    };
    fetch("http://localhost:3000/users/other_users", options)
      .then((res) => res.json())
      .then((res) => {
        console.log("in people useEffect");
        if (res.status === "success") {
          props.setPeople(res.users);
          localStorage.removeItem("people");
          localStorage.setItem("people", JSON.stringify(res.users));
        }
      });
  }, []);

  return (
    <div className="landingPage-people">
      <div className="landingPage-people-friends-container">
        {props.renderFriendReq ? (
          <RenderFriendReq
            user={props.signedInUser}
            setSignedInUser={props.setSignedInUser}
            setUserProfile={props.setUserProfile}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            className="landingPage-people-friends"
          />
        ) : (
          <></>
        )}
        {props.renderFriends ? (
          <RenderFriends
            user={props.signedInUser}
            setUserProfile={props.setUserProfile}
            className="landingPage-people-friends"
          />
        ) : (
          <></>
        )}
      </div>
      {props.renderUsers ? (
        <RenderUsers
          people={props.people}
          user={props.signedInUser}
          setSignedInUser={props.setSignedInUser}
          setUserProfile={props.setUserProfile}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setShowMenuUsername={setShowMenuUsername}
          showMenuUsername={showMenuUsername}
          chatbox={props.chatbox}
          setChatbox={props.setChatbox}
          chatUsers={props.chatUsers}
          setChatUsers={props.setChatUsers}
          className="landingPage-people"
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default People;
