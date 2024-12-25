import React from "react";
import "./Profile.css";
import MyWall from "../sections/Profile/MyWall.jsx";
import MyPosts from "../sections/Profile/MyPosts.jsx";
import Chatbox from "../global/Chatbox/Chatbox.jsx";
import People from "../global/People/People.jsx";
import ChatSystem from "../global/ChatSystem/ChatSystem";
import { useEffect, useState } from "react";

function Profile(props) {
  console.log("In Profile");
  const [userProfileInfo, setUserProfileInfo] = useState();
  const [resetProfile, setResetProfile] = useState("");
  const [myShow, setMyShow] = useState("myWall");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}users/username/${props.userProfile}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserProfileInfo(res.user);
      });
  }, [resetProfile]);

  const myPostBtnHandler = () => {
    console.log("mypostBtn working");
    setMyShow("myPost");
  };
  const myWallBtnHandler = () => {
    console.log("myWallBtn Working");
    setMyShow("myWall");
  };
  const addUserBtnHandler = () => {
    const options = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toAddUserId: userProfileInfo._id,
      }),
    };
    fetch(
      `${import.meta.env.VITE_API}users/${props.user._id}/update/addFriendReq`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("In Profile add friend");
        props.setSignedInUser(res.user);
      });
  };

  const userValidate = userProfileInfo
    ? userProfileInfo.user_name === props.user.user_name
    : "";

  const checkIfFriends = () => {
    if (userProfileInfo != null) {
      for (let j = 0; j < props.user.friends.length; j++) {
        if (props.user.friends[j]._id === userProfileInfo._id) return true;
      }

      return false;
    }
  };

  const filterInOutFReq = () => {
    for (let j = 0; j < props.user.friend_requests.length; j++) {
      if (props.user.friend_requests[j].inbound._id === userProfileInfo._id) {
        return "inbound";
      }
      if (props.user.friend_requests[j].outbound._id === userProfileInfo._id) {
        return "outbound";
      }
    }
    return false;
  };

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
              {userProfileInfo.user_name !== props.user.user_name &&
              !checkIfFriends() &&
              !filterInOutFReq() ? (
                <div className="profile-addUserBtn" onClick={addUserBtnHandler}>
                  +
                </div>
              ) : (
                ""
              )}
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
          <div className="profile-myWall-myPosts-container">
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
                userValidate={
                  userProfileInfo.user_name === props.user.user_name
                }
              />
            ) : myShow === "myPost" ? (
              <MyPosts
                posted_userId={props.user._id}
                signedInUser={props.user}
              />
            ) : (
              ""
            )}
            <div className="profile-myWall-myPosts-borderRight"></div>
            <div className="profile-myWall-myPosts-borderLeft"></div>
          </div>

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
            className="profile"
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
