import React from "react";
import "./Profile.css";
import MyWall from "../sections/Profile/MyWall.jsx";
import MyPosts from "../sections/Profile/MyPosts.jsx";
import Chatbox from "../global/Chatbox/Chatbox.jsx";
import RenderFriends from "../global/People/RenderUsersUtilify/RenderFriends";
import RenderUsers from "../global/People/RenderUsersUtilify/RenderUsers";
import People from "../global/People/People.jsx";
import ChatSystem from "../global/ChatSystem/ChatSystem";
import { useEffect, useState } from "react";

function Profile(props) {
  console.log("In Profile");
  const [userProfileInfo, setUserProfileInfo] = useState();
  const [resetProfile, setResetProfile] = useState("");
  const [myShow, setMyShow] = useState("myWall");
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuUsername, setShowMenuUsername] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/users/username/${props.userProfile}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserProfileInfo(res.user);
      });
    // const removeMenu = (e) => {
    //   if (e.target.classList.contains(!"renderUsers-user-user-username"))
    //     setShowMenu(false);
    // };
    // window.addEventListener("click", removeMenu);
    // return () => {
    //   window.removeEventListener("click", removeMenu);
    // };
  }, [resetProfile]);

  const myPostBtnHandler = () => {
    console.log("mypostBtn working");
    setMyShow("myPost");
  };
  const myWallBtnHandler = () => {
    console.log("myWallBtn Working");
    setMyShow("myWall");
  };

  const userValidate = userProfileInfo
    ? userProfileInfo.user_name === props.user.user_name
    : "";

  console.log("heree in profilee");
  return (
    <div className="profile-container">
      {userProfileInfo ? (
        <>
          <div className="profile-userInfo">
            <div className="profile-username profile-userInfo-tag">
              {/* <div className="profile-username-title">Username:</div> */}
              <div className="profile-username-username">
                {userProfileInfo.user_name}
              </div>
            </div>
            <div className="profile-bio profile-userInfo-tag">
              {/* <div className="profile-bio-title">Bio:</div> */}
              <div className="profile-bio-bio">{userProfileInfo.bio}</div>
            </div>
          </div>
          <ChatSystem
            signedInUser={props.user}
            setChatUsers={props.setChatUsers}
            setChatbox={props.setChatbox}
            chatbox={props.chatbox}
            resetChatSystem={props.resetChatSystem}
          />
          {userValidate ? (
            <div className="profile-tab">
              <div
                className="profile-tab-profileWall profile-tab-tab"
                onClick={myWallBtnHandler}
              >
                MyWall
              </div>
              <div
                className="profile-tab-userPosts profile-tab-tab"
                onClick={myPostBtnHandler}
              >
                MyPosts
              </div>
            </div>
          ) : (
            <></>
          )}

          {myShow === "myWall" ? (
            <MyWall
              userProfile={userProfileInfo}
              signedInUser={props.user}
              userValidate={userProfileInfo.user_name === props.user.user_name}
            />
          ) : myShow === "myPost" ? (
            <MyPosts posted_userId={props.user._id} signedInUser={props.user} />
          ) : (
            "dfd"
          )}

          {/* <div className="profile-friends">
            <RenderFriends
              user={userProfileInfo}
              setUserProfile={props.setUserProfile}
              resetProfile={setResetProfile}
            />
          </div>
          <div className="profile-users">
            <RenderUsers
              people={props.people}
              user={props.user}
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
              className="profile"
            />
          </div> */}
          <People
            signedInUser={props.user}
            setSignedInUser={props.setSignedInUser}
            setUserProfile={props.setUserProfile}
            people={props.people}
            setPeople={props.setPeople}
            chatbox={props.chatbox}
            setChatbox={props.setChatbox}
            chatUsers={props.chatUsers}
            setChatUsers={props.setChatUsers}
            renderUsers={true}
            renderFriends={true}
            renderFriendReq={true}
          />
          {props.chatbox ? (
            <Chatbox
              chatUsers={props.chatUsers}
              setSignedInUser={props.setSignedInUser}
              chatbox={props.chatbox}
              setChatbox={props.setChatbox}
              signedInUser={props.user}
              setResetChatSystem={props.setResetChatSystem}
              resetChatSystem={props.resetChatSystem}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
