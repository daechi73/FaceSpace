import React from "react";
import { useEffect, useState } from "react";
import "./People.css";
import RenderUsers from "./RenderUsersUtilify/RenderUsers";
import RenderFriends from "./RenderUsersUtilify/RenderFriends";
import RenderFriendReq from "./RenderUsersUtilify/RenderFriendReq";
import UserMenu from "../../global/UserClickMenu/UserMenu";
import RenderUserClickMenu from "../UserClickMenu/RenderUserClickMenu";

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
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const removeMenu = (e) => {
      if (!e.target.classList.contains("renderUsers-user-user-username")) {
        setShowMenu(false);
      }
    };
    //username-handleUsernameClick
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
    fetch(`${import.meta.env.VITE_API}users/other_users`, options)
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

  //handles username click in each render components
  const handleUsernameClick = (e) => {
    UserMenu(
      showMenu,
      setShowMenu,
      setShowMenuUsername,
      e.target.innerText,
      e.pageX,
      e.pageY,
      setCoords
    );
    console.log(e);
  };

  return (
    <div className={props.className + "-people" + " people"}>
      <div
        className={
          props.className +
          "-people-friends-container" +
          " people-friends-container"
        }
      >
        {props.renderFriendReq ? (
          <RenderFriendReq
            user={props.signedInUser}
            setSignedInUser={props.setSignedInUser}
            setUserProfile={props.setUserProfile}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            className={props.className}
            handleUsernameClick={handleUsernameClick}
          />
        ) : (
          <></>
        )}
        {props.renderFriends ? (
          <RenderFriends
            user={props.signedInUser}
            setUserProfile={props.setUserProfile}
            className={props.className}
            handleUsernameClick={handleUsernameClick}
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
          handleUsernameClick={handleUsernameClick}
          className={props.className}
        />
      ) : (
        <></>
      )}
      {showMenu ? (
        <RenderUserClickMenu
          username={showMenuUsername}
          setUserProfile={props.setUserProfile}
          setShowMenu={setShowMenu}
          chatbox={props.chatbox}
          setChatbox={props.setChatbox}
          chatUsers={props.chatUsers}
          setChatUsers={props.setChatUsers}
          signedInUser={props.signedInUser}
          coords={coords}
        />
      ) : (
        <></>
      )}
      <div className="people-borderLeft"></div>
    </div>
  );
}

export default People;
